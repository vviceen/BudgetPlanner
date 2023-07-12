from rest_framework import viewsets
from app.models import User, Category, Expenses, Budget
from app.serializers import CategorySerializer, UserSerializer, BudgetSerializer , ExpensesSerializer
from django.contrib.auth import login, logout, authenticate
from django.shortcuts import redirect
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, redirect
from rest_framework import status
from django.contrib.auth.decorators import login_required
from .forms import new_user, log_user, add_expense
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ExpensesViewSet(viewsets.ModelViewSet):
    queryset = Expenses.objects.all()
    serializer_class = ExpensesSerializer

class BudgetViewSet(viewsets.ModelViewSet):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer


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
        return Response(status=status.HTTP_401_OK)

@api_view(['POST'])
def get_category(request):
    if request.method == "POST":
        category_ids = request.data.get('category_ids')  # Cambiar a category_ids
        categories = Category.objects.filter(category_id__in=category_ids)  # Usar category_id__in
        serialized_categories = CategorySerializer(categories, many=True)  # Usar many=True
        data = {
            'message': 'Categorías recibidas correctamente',
            'categories': serialized_categories.data  # Cambiar a categories
        }
        return Response(data, status=status.HTTP_200_OK)
    else:
        return HttpResponse(status=400)

def all_expenses(request):
        try:
            user_id = request.query_params.get('user')
            expenses = Expenses.objects.filter(user=user_id).order_by('-date_of_expense').values()
            print(expenses)
            total = 0
            # categories =
            cat_dict = {}
            for o in expenses:
                o['category'] = CategorySerializer(Category.objects.get(category_id=o['category_of_expense_id'])).data
                try:
                    cat_dict[o['category']['name']] += o['amount']
                    print(o['amount'])
                except KeyError:
                    cat_dict[o['category']['name']] = o['amount']
                total += o['amount']
            data = {
                'expenses': expenses,
                'total_expenses': total,
                'categorias_totales': cat_dict
            }
            return Response(data, status=status.HTTP_200_OK)
        except Expenses.DoesNotExist:
            data = {
                'message': 'No se encontró el gasto especificado'
            }
            return Response(data, status=status.HTTP_404_NOT_FOUND)

def new_expense(request):
    user_id = request.data.get('user_id')
    user = User.objects.get(id=user_id)
    amount = request.data.get('amount')
    category_name = request.data.get('category_name')
    category_of_expense = Category.objects.get(name=category_name)
    description = request.data.get('description')
    expense = Expenses(
        amount=amount, category_of_expense=category_of_expense, description=description, user=user)
    expense.save()
    expenses = Expenses.objects.filter(user=user)
    total_expenses = 0
    for expense in expenses:
        total_expenses += expense.amount
    return Response(total_expenses, status=status.HTTP_200_OK)

def delete_expense(request):
    expense_id = request.data.get('expense_id')
    expense = Expenses.objects.get(expense_id=expense_id)
    expense.delete()
    return Response(status=status.HTTP_200_OK)

@api_view(['GET', 'POST', 'DELETE'])
def expenses(request):
    if request.method == 'GET':
        return all_expenses(request)
    if request.method == 'POST':
        return new_expense(request)
    if request.method == 'DELETE':
        return delete_expense(request)

@api_view(['GET', 'POST'])
def budget(request):
    if request.method == 'GET':
        return get_budget(request)
    if request.method == 'POST':
        return new_budget(request)


def new_budget(request):
    if request.method == "POST":
        user_id = request.data.get('user')
        user_budget = Budget.objects.filter(user=user_id)
        user = User.objects.get(id=user_id)
        budget = request.data.get('budget')
        if not user_budget:
            b = Budget(user = user, budget = budget)
            b.save()
        else:
            user_budget.update(budget = budget)
        return Response(status=status.HTTP_200_OK)

def get_budget(request):
    user_budget = BudgetSerializer(Budget.objects.filter(user=request.query_params.get('user')), many=True).data
    return Response(user_budget, status=status.HTTP_200_OK)

@api_view(['POST'])
def edit_expense(request):
    if request.method == "POST":
        expense_id = request.data.get('expense_id')
        amount = request.data.get('amount')
        description = request.data.get('description')
        expense = Expenses.objects.get(id=expense_id)
        expense.amount = amount
        expense.description = description
        expense.save()
        return Response(status=status.HTTP_200_OK)
    else:
        return HttpResponse(status=400)

@api_view(['POST'])
def get_categories(request):
    if request.method == "POST":
        user_expenses = Expenses.objects.filter(user_id=request.data.get('user_id'))
        ordered_categories = Category.objects.filter()
        categories = Category.objects.all()
        serialized_categories = CategorySerializer(list(categories), many=True)
        return Response(serialized_categories.data, status=status.HTTP_200_OK)
    else:
        return HttpResponse(status=400)