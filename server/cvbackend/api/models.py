from django.db import models

class CV(models.Model):
    fName = models.CharField(max_length=100, default='')
    lName = models.CharField(max_length=100, default='')
    email = models.EmailField(null=True, blank=True, default='')
    phone = models.CharField(null=True, blank=True, max_length=11, default='')
    addr = models.CharField(blank=True, max_length=100, null=True,  default='')
    availability = models.CharField(null=True, blank=True, max_length=10, default='Available')
    prefJob = models.CharField(null=True, blank=True, max_length=100, default='')

    matric_total_marks = models.IntegerField(null=True, blank=True, default=0)
    matric_obtained_marks = models.IntegerField(null=True, blank=True, default=0)
    matric_grade = models.CharField(null=True, blank=True, max_length=1)
    inter_total_marks = models.IntegerField(null=True, blank=True, default=0)
    inter_obtained_marks = models.IntegerField(null=True, blank=True, default=0)
    inter_grade = models.CharField(null=True, blank=True, max_length=1)
    bachelors_total_marks = models.IntegerField(null=True, blank=True, default=0)
    bachelors_obtained_marks = models.IntegerField(null=True, blank=True, default=0)
    bachelors_grade = models.CharField(null=True, blank=True, max_length=1)
    masters_total_marks = models.IntegerField(null=True, blank=True, default=0)
    masters_obtained_marks = models.IntegerField(null=True, blank=True, default=0)
    masters_grade = models.CharField(null=True, blank=True, max_length=1)
    
    company_name = models.CharField(max_length=100, null=True, blank=True, default='')
    designation = models.CharField(max_length=100, null=True, blank=True, default='')
    role = models.CharField(max_length=100, null=True, blank=True, default='')
    start_date = models.DateField(null=True, blank=True, default='')
    end_date = models.DateField(null=True, blank=True, default='')
    totalExperience = models.IntegerField(default=0)
    skills = models.CharField(null=True, blank=True)

    def __str__(self):
        return f"{self.fName} {self.lName}"



