"""
URL configuration for bp_app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from app.views import signup, signin, signout, all_expenses, new_expense, overview, get_category, delete_expense, expenses, budget

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app.urls')),
    path('logout', signout),
    path('register', signup),
    path('login', signin),
    path('user/expenses', expenses),
    path('user/budget', budget),
    # path('user/expenses', all_expenses),
    # path('user/expenses/new', new_expense),
    # path('user/expenses/delete', delete_expense),
    path('dashboard', overview),
    path('category', get_category),
]