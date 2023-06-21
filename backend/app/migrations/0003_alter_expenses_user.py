# Generated by Django 4.2.1 on 2023-06-21 16:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app', '0002_remove_expenses_user_id_expenses_user_delete_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expenses',
            name='user',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
