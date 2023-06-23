from rest_framework import viewsets
from app.models import User, Category, Expenses
from app.serializers import CategorySerializer, ExpensesSerializer
from django.contrib.auth import login, logout, authenticate
from django.shortcuts import redirect
from django.http import JsonResponse, HttpResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
import json
from django.contrib.auth.decorators import login_required

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ExpensesViewSet(viewsets.ModelViewSet):
    queryset = Expenses.objects.all()
    serializer_class = ExpensesSerializer


def signup(request):
    if request.method == "GET":
        return render(request, 'login.html',{
            'form': UserCreationForm
        })
    else:
        try:
            password1 = request.POST.get('password1')
            password2 = request.POST.get('password2')
            if password1 == password2:
                username = request.POST.get('username')
                print(username, password1)
                user = User.objects.create_user(username=username, password=password1)
                login(request, user)
                user.save()
                #redirect()
        except:
            return render(request, 'login.html',{
            'form': UserCreationForm,
            'error': 'User already exist'
        })

@login_required
def sign_out(request):
    logout(request)
    #return redirect('')  # Cambia 'home' por la URL de tu página de inicio

def sign_in(request):
    if request.method == "GET":
        return render(request, 'login.html',{
            'form': AuthenticationForm 
        })
    else:
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            #return HttpResponse(f'user {username} succesfuly loged in')
            #return redirect('dashboard')  # Cambia 'dashboard' por la URL de tu página de inicio de sesión exitosa
"""
def ret_crsf(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrf': csrf_token})

"""

@login_required
def all_expenses(request):
    if request.method == "GET":
        user = request.user
        expenses = Expenses.objects.filter(user=user)
        serialized_expenses = [{'amount': expense.amount, 'currency': expense.currency} for expense in expenses]
        return HttpResponse(json.dumps(serialized_expenses), content_type='application/json')

@login_required
def new_expense(request):
    if request.method == "POST":
        user = request.user
        amount = request.POST.get('amount')
        category_name = request.POST.get('category_of_expense')
        category_of_expense = Category.objects.filter(name=category_name)
        description = request.POST.get('description')
        expense = Expenses(amount=amount, category_of_expense=category_of_expense, description=description, user=user)
        expense.save()
        return HttpResponse('Expense created succesully')
