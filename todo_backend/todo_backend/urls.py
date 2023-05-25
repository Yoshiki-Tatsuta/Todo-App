from django.urls import path
from .views import TodoListAPIView

urlpatterns = [
    path('api/todos/', TodoListAPIView.as_view(), name='todo-list'),
]
