from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Category(models.Model):
    """categories table"""
    category_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)


class Expenses(models.Model):
    """expenses table"""
    """these are the options that the user has to choose when adding an expense"""
    currency_choices = [
        ('USD', 'U$S'),
        ('UYU', 'U$'),
    ]
    expense_id = models.AutoField(primary_key=True)
    category_of_expense = models.ForeignKey(Category, on_delete=models.CASCADE)
    amount = models.PositiveIntegerField(default=0)
    user_total_expenses = models.PositiveBigIntegerField(default=0)
    date_of_expense = models.DateTimeField(default=timezone.now)
    currency = models.CharField(choices=currency_choices, max_length=50)
    description = models.CharField(max_length=50)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, default=None)
