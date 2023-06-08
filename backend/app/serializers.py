from rest_framework import serializers
from app.models import User, Category, Expenses


class user_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_name', 'email', 'user_id', 'password', 'budget')
        read_only_fields = ('user_id', )


class category_serializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('category_id', 'name')
        read_only_fields = ('category_id', )


class Expenses_serializer(serializers.ModelSerializer):
    class Meta:
        model = Expenses
        fields = ('expense_id', 'amount', 'user_total_expenses',
                  'date_of_expense', 'currency', 'description', 'user_id', 'category_of_expense')
        read_only_fields = ('expense_id', )
