from django.urls import path
from .views import TodoListAPIView, TodoDetailAPIView

urlpatterns = [
    path('api/todos/', TodoListAPIView.as_view(), name='todo-list'),
    path('api/todos/<int:pk>/', TodoDetailAPIView.as_view(), name='todo-detail'),
]
