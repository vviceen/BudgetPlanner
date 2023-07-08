from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from app import views

router = routers.DefaultRouter()

#router.register('user', views.UserViewSet, basename='user')
router.register('user/<int:user>/expenses', views.ExpensesViewSet, basename='expenses')
router.register('category', views.CategoryViewSet, basename='category')
router.register('user/<int:user>/budget', views.BudgetViewSet, basename='budget')

urlpatterns = [
    path("api/", include(router.urls)),
    path("docs/", include_docs_urls(title="API doc")),
    path('user/expenses', views.expenses),
    path('user/budget', views.budget),
    path('user/dashboard', views.overview),
    path('category', views.get_category)
]
