from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import CV
from .serializers import CVSerializer
from langchain.prompts import ChatPromptTemplate
from langchain_mistralai.embeddings import MistralAIEmbeddings
from langchain_google_genai.chat_models import ChatGoogleGenerativeAI

from dotenv import load_dotenv
load_dotenv()
from pydantic import SecretStr
import os
from supabase import create_client


TEXT_PREPROCESSING_PROMPT = ChatPromptTemplate.from_messages([
("system",
    '''You are Json text preprocessor your job is to take json data and write a cv for the user with the available information, and you write it like a professional take data which is important for cv to show in and you have to write cv in way that it should be used later for chunks because this response will be used to convert it into chunks later and then for high quality embeddings.'''),
("user", "write a cv with the json data available : {data}"),])

QUERY_ANSWERING_PROMPT = ChatPromptTemplate.from_messages([
    ("system",
     '''You are professional question answering model.
     Your task is to answer the question based on the context provided.
     But if you do not find the context relevant to the question
     then you will always respond with "Feed me more documents to answer this question."
     Here is context: {context} and make sure that you always return your response in proper
     markdown format and you do not have to say based on context we do 
     not want to tell user that you are answering on context basis.
     '''),
    ("user", "Answer the following question: {question}"),
])

DOCUMENT_CHUNKING_PROMPT = ChatPromptTemplate.from_messages([
    ("system",
     '''
     You are a text preprocessor for a document chunking model. 
     Your task is to split a long text into chunks of approximately 100 words each and each chunk
     must be separated by a single comma no headings nothing at all just chunks even though last chunk must 
     also have single comma at the end and each chunk must be end with this "]*" 
     except last chunk like last chunk do not has comma and "]*" at end. 
     Ensure that each chunk is a coherent piece of text that makes sense on its own. Do not split 
     sentences or paragraphs in the middle. If a chunk ends in the middle of a sentence or paragraph, 
     include the entire sentence or paragraph in that chunk. 
     You can split the text at natural breaks, such as headings, 
     lists, or sections, but avoid splitting the text in the middle of a list or a section. 
     Your goal is to create chunks that are informative and easy to read, 
     so that the document chunking model can generate high-quality chunks 
     without losing important information and must sure that chunks should not be duplicate at all. 
     These chunks will be used to create embeddings and they will store them in vector database separately. So, you
     have to create chunks in such a way that they can be used to create embeddings 
     without semantic loss. Because user will ask for questions and everytime the question will
     be looked through these chunks to get the answer, so that is why we have to keep chunks in that
     format that every question can be answered from these chunks.
     '''),
    ("user", "Split the following text into chunks: {text}"),
])

embeddings_model = MistralAIEmbeddings(
    model='mistral-embed',
    mistral_api_key= SecretStr(os.environ.get('mistalai_key')),
)

generative_model = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash-preview-04-17",
    google_api_key=SecretStr(os.environ.get('chenai_key')),
)

supabase_client = create_client(os.environ.get('supabase_url'), os.environ.get('supabase_key'))

def json_to_str(data_p):
    dataVar = TEXT_PREPROCESSING_PROMPT.invoke({"data":data_p})
    plain_text = generative_model.invoke(dataVar)
        
    responses = DOCUMENT_CHUNKING_PROMPT.invoke({"text": plain_text.content})
    chunks_string = generative_model.invoke(responses)
    for chunk in chunks_string.content.split("]*,"):
        chunk_embedding = embeddings_model.embed_query(chunk)
        supabase_client.table('cvs').insert({'user_id':data_p['email'], 'text': chunk, 'embedding': chunk_embedding}).execute()

@api_view(['GET', 'POST'])
def cv_list_create(request):
    if request.method == 'GET':
        cvs = CV.objects.all()
        serializer = CVSerializer(cvs, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = CVSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            json_to_str(request.data)
            return Response({'message': 'CV submitted successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def cv_detail(request, pk):
    try:
        cv = CV.objects.get(pk=pk)
    except CV.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CVSerializer(cv)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CVSerializer(cv, data=request.data)
        supabase_client.table("cvs").delete().eq("user_id", cv.email).execute()
        json_to_str(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        cv.delete()
        supabase_client.table("cvs").delete().eq("user_id", cv.email).execute()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def chat(request):
    if request.method == 'POST':
        data = request.data
        message = data.get('message')
        query_embedding = embeddings_model.embed_query(message)
        response = supabase_client.rpc('match_documents', {'query_embedding': query_embedding}).execute()
        answering_prompt = QUERY_ANSWERING_PROMPT.invoke({
            "context": response.data[0]['text'],
            "question": message 
        })
        answer = generative_model.invoke(answering_prompt)
        return Response({"answer": answer.content})