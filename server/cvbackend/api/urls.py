from django.urls import path
from .views import cv_list_create, cv_detail, chat

urlpatterns = [
    path('cv/', cv_list_create, name='cv_list_create'),
    path('cv/<int:pk>/', cv_detail, name='cv_detail'),
    path('cv/chat', chat, name='chat_bot')
]
