from rest_framework import viewsets
from app.models import User, Category, Expenses
from app.serializers import CategorySerializer, ExpensesSerializer
from django.contrib.auth import login, logout, authenticate
from django.shortcuts import redirect
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, redirect
import json
from django.contrib.auth.decorators import login_required
from .forms import new_user, log_user


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ExpensesViewSet(viewsets.ModelViewSet):
    queryset = Expenses.objects.all()
    serializer_class = ExpensesSerializer


def signup(request):
    if request.method == "GET":
        return render(request, 'register.html', {
            'form': new_user
        })
    else:
        try:
            password1 = request.POST.get('password1')
            password2 = request.POST.get('password2')
            if password1 == password2:
                username = request.POST.get('username')
                print(username, password1)
                user = User.objects.create_user(
                    username=username, password=password1)
                login(request, user)
                user.save()
                return HttpResponse("user created succesfully")
                # redirect()
        except:
            return render(request, 'register.html', {
                'form': new_user,
                'error': 'User already exist'
            })


@login_required
def signout(request):
    if request.method == "GET":
        logout(request)
        return HttpResponse("bye bye")
    # return redirect('')  # Cambia 'home' por la URL de tu página de inicio


def signin(request):
    if request.method == "GET":
        return render(request, 'login.html', {
            'form': log_user
        })
    else:
        username = request.POST.get('username')
        password = request.POST.get('password1')
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return redirect(f'http://localhost:5173/dashboard?user_id={user.id}')
            # return redirect('dashboard')  # Cambia 'dashboard' por la URL de tu página de inicio de sesión exitosa


def all_expenses(request):
    if request.method == "POST":
        user_id = request.POST.get('id')
    else:
        user = username
        expenses = Expenses.objects.filter(user=user)
        serialized_expenses = [
            {'amount': expense.amount, 'currency': expense.currency} for expense in expenses]
        return HttpResponse(json.dumps(serialized_expenses), content_type='application/json')


def new_expense(request):
    if request.method == "POST":
        user = request.user
        amount = request.POST.get('amount')
        category_name = request.POST.get('category_of_expense')
        category_of_expense = Category.objects.filter(name=category_name)
        description = request.POST.get('description')
        expense = Expenses(
            amount=amount, category_of_expense=category_of_expense, description=description, user=user)
        expense.save()
        return HttpResponse('Expense created succesully')
