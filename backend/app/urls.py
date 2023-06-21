from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from app import views

router = routers.DefaultRouter()

#router.register('user', views.UserViewSet, basename='user')
router.register('expenses', views.ExpensesViewSet, basename='expenses')
router.register('category', views.CategoryViewSet, basename='category')

urlpatterns = [
    path("api/", include(router.urls)),
    path("docs/", include_docs_urls(title="API doc"))
]
