from django.contrib import admin
from .models import CV

@admin.register(CV)
class CVAdmin(admin.ModelAdmin):
    list_display = [
            'fName',
            'lName',
            'email',
            'phone',
            'addr',
            'availability',
            'prefJob',
            'matric_total_marks',
            'matric_obtained_marks',
            'matric_grade',
            'inter_total_marks',
            'inter_obtained_marks',
            'inter_grade',
            'bachelors_total_marks',
            'bachelors_obtained_marks',
            'bachelors_grade',
            'masters_total_marks',
            'masters_obtained_marks',
            'masters_grade',
            'company_name',
            'designation',
            'role',
            'start_date',
            'end_date',
            'totalExperience',
            'skills'
        ]
