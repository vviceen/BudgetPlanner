from rest_framework import viewsets
from app.models import User, Category, Expenses
from app.serializers import UserSerializer, CategorySerializer, ExpensesSerializer
from django.contrib.auth import login, logout, authenticate
from django.shortcuts import redirect
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ExpensesViewSet(viewsets.ModelViewSet):
    queryset = Expenses.objects.all()
    serializer_class = ExpensesSerializer

@csrf_exempt
def signup(request):
    csrf_token = get_token(request)
    print("hola")
    password1 = request.POST.get('password1')
    password2 = request.POST.get('password2')
    if password1 == password2:
        username = request.POST.get('username')
        print(username, password1)
        user = User.objects.create_user(username=username, password=password1)
        login(request, user)
        return JsonResponse({'username': username}, status=200)
    else:
        return JsonResponse({'error': 'Passwords do not match'}, status=400)

def sign_out(request):
    logout(request)
    return redirect('')  # Cambia 'home' por la URL de tu página de inicio

def sign_in(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username, password=password)
    if user:
        login(request, user)
        return redirect('dashboard')  # Cambia 'dashboard' por la URL de tu página de inicio de sesión exitosa
    else:
        return JsonResponse({'error': 'Invalid username or password'}, status=400)

def ret_crsf(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrf': csrf_token})
