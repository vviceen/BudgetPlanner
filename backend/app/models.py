from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password, check_password


class Category(models.Model):
    """categories table"""
    category_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)

    class Meta:
        app_label = 'app'


class User(models.Model):
    """user table"""
    user_name = models.CharField(max_length=20)
    email = models.EmailField(max_length=254)
    user_id = models.AutoField(primary_key=True)
    password = models.CharField(max_length=120)
    budget = models.PositiveBigIntegerField(default=0)
    """this are methods that allow us to verify and
    control the security of the passwords
    in the database, both are given by django"""

    def set_password(self, verify_password):
        self.password = make_password(verify_password)

    def check_password(self, verify_password):
        return check_password(verify_password, self.password)


class Expenses(models.Model):
    """expenses table"""
    """this are the options that the user have to choose when add an expense"""
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
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
