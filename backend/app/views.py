from rest_framework import viewsets
from app.models import User, Category, Expenses
from app.serializers import CategorySerializer, ExpensesSerializer, UserSerializer
from django.contrib.auth import login, logout, authenticate
from django.shortcuts import redirect
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, redirect
from rest_framework import status
from django.contrib.auth.decorators import login_required
from .forms import new_user, log_user, add_expense
from rest_framework.decorators import api_view
from rest_framework.response import Response

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ExpensesViewSet(viewsets.ModelViewSet):
    queryset = Expenses.objects.all()
    serializer_class = ExpensesSerializer

@api_view(['POST', 'GET'])
def signup(request):
    if request.method == "GET":
        return render(request, 'register.html', {
            'form': new_user
        })
    else:
        try:
            password1 = request.data.get('password1')
            password2 = request.data.get('password2')
            if password1 == password2:
                username = request.data.get('username')
                print(username, password1)
                user = User.objects.create_user(
                    username=username, password=password1)
                login(request, user)
                user.save()
                data = {
                    "user_id" : user.id
                }
                return Response(status=status.HTTP_201_CREATED, data=data)
        except:
            return render(request, 'register.html', {
                'form': new_user,
                'error': 'User already exist'
            })

def overview(request):
    return render(request, 'dashboard.html', {
        'form': add_expense,
        'error': 'Error en add expense'
    })

@login_required
def signout(request):
    if request.method == "GET":
        logout(request)
        return HttpResponse("bye bye")
    # return redirect('')  # Cambia 'home' por la URL de tu página de inicio

@api_view(['POST'])
def signin(request):
    if request.method == "GET":
        return render(request, 'login.html', {
            'form': log_user
        })
    else:
        username = request.data.get('username')
        password = request.data.get('password')
        print(username, password)
        user = authenticate(username=username, password=password)
        #user = User.objects.filter(username=username, password=password)
        #serialized_users = UserSerializer(list(user), many=True)
        #print(serialized_users)
        print(user)
        if user:
            login(request, user)
            data = {
                "user_id" : user.id
            }
            return Response(data)
            # return redirect('dashboard')  # Cambia 'dashboard' por la URL de tu página de inicio de sesión exitosa

@api_view(['POST'])
def all_expenses(request):
    if request.method == "POST":
        try:
            user_id = request.data.get('user_id')
            print(user_id)
            print(Expenses.objects.all())
            expenses = Expenses.objects.filter(user_id=user_id)
            print(expenses)
            serialized_expenses = ExpensesSerializer(list(expenses), many=True)
            total_expenses = 0
            for expense in expenses:
                total_expenses += expense.amount
            data = {
                'message': 'Gastos recibidos correctamente',
                'expenses': serialized_expenses.data,
                'total_expenses': total_expenses
            }
            return Response(data, status=status.HTTP_200_OK)
        except Expenses.DoesNotExist:
            data = {
                'message': 'No se encontró el gasto especificado'
            }
            return Response(data, status=status.HTTP_404_NOT_FOUND)
    else:
        return HttpResponse(status=400)

@api_view(['POST'])
def new_expense(request):
    if request.method == "POST":
        user_id = request.data.get('user_id')
        user = User.objects.get(id=user_id)
        amount = request.data.get('amount')
        category_name = request.data.get('category_name')
        category_of_expense = Category.objects.get(name=category_name)
        description = request.data.get('description')
        print(user, amount, category_of_expense, description)
        expense = Expenses(
            amount=amount, category_of_expense=category_of_expense, description=description, user=user)
        expense.save()
        expenses = Expenses.objects.filter(user=user)
        total_expenses = 0
        for expense in expenses:
            total_expenses += expense.amount
        return Response(total_expenses, status=status.HTTP_200_OK)