# Generated by Django 5.2.1 on 2025-05-16 23:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_cv_bachelors_grade'),
    ]

    operations = [
        migrations.AddField(
            model_name='cv',
            name='role',
            field=models.CharField(blank=True, default='', max_length=100, null=True),
        ),
    ]
