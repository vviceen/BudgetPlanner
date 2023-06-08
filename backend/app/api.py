from app.models import User, Category, Expenses
from rest_framework import viewsets, permissions
from app.serializers import user_serializer, category_serializer, Expenses_serializer


class user_viewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = user_serializer


class category_viewset(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = category_serializer


class Expenses_viewset(viewsets.ModelViewSet):
    queryset = Expenses.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = Expenses_serializer
