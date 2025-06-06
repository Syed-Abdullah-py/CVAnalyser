# Generated by Django 5.2.1 on 2025-05-16 18:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_rename_first_name_cv_fname_rename_last_name_cv_lname_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='cv',
            name='addr',
            field=models.CharField(blank=True, default='', max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='cv',
            name='availability',
            field=models.CharField(default='Available', max_length=10),
        ),
        migrations.AddField(
            model_name='cv',
            name='bachelors_obtained_marks',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name='cv',
            name='bachelors_total_marks',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name='cv',
            name='company_name',
            field=models.CharField(blank=True, default='', max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='cv',
            name='designation',
            field=models.CharField(blank=True, default='', max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='cv',
            name='email',
            field=models.EmailField(default='', max_length=254),
        ),
        migrations.AddField(
            model_name='cv',
            name='end_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='cv',
            name='inter_obtained_marks',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name='cv',
            name='inter_total_marks',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name='cv',
            name='masters_obtained_marks',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name='cv',
            name='masters_total_marks',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name='cv',
            name='matric_obtained_marks',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name='cv',
            name='matric_total_marks',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name='cv',
            name='phone',
            field=models.CharField(default='', max_length=11),
        ),
        migrations.AddField(
            model_name='cv',
            name='prefJob',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='cv',
            name='start_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='cv',
            name='totalExperience',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='cv',
            name='fName',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='cv',
            name='lName',
            field=models.CharField(default='', max_length=100),
        ),
    ]
