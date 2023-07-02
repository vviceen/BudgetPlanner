# Generated by Django 4.2.1 on 2023-06-28 19:18

from django.db import migrations
from app.models import Category

def add_initial_categories(apps, schema_editor):
    Category.create_initial_categories()

class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_alter_expenses_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='expenses',
            name='user_total_expenses',
        ),
        migrations.RunPython(add_initial_categories),
    ]
