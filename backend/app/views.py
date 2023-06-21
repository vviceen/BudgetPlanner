from rest_framework import viewsets
from app.models import User, Category, Expenses
from app.serializers import UserSerializer, CategorySerializer, ExpensesSerializer
from django.contrib.auth import login, logout, authenticate
from django.shortcuts import redirect
from django.http import JsonResponse

# Create your views here.


"""class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
"""


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ExpensesViewSet(viewsets.ModelViewSet):
    queryset = Expenses.objects.all()
    serializer_class = ExpensesSerializer


def signup(request):
    if request.POST['password1'] == request.POST['password2']:
        username = request.POST.get('username')
        password = request.POST.get('password1')
        user = User.objects.create_user(
            username=username, password=password)
        login(request, user)
        user.save()
        return JsonResponse({'username': username}, status=200)


def sign_out(request):
    logout(request)


def sign_in(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username, password=password)
    if user:
        login(request, user)


def ret_crsf(request):
    csrf_token = get_token(request)
    return JsonResponse({
        'csrf': csrf_token
    })
