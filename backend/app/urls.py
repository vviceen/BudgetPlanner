from rest_framework import routers
from app.api import user_viewset, Expenses_viewset, category_viewset

router = routers.DefaultRouter()

router.register('api/user', user_viewset, 'user')
router.register('api/expenses', Expenses_viewset, 'Expenses')
router.register('api/category', category_viewset, 'Category')

urlpatterns = router.urls
