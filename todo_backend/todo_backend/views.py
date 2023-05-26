from rest_framework import generics
from .models import Todo
from .serializers import TodoSerializer

class TodoListAPIView(generics.ListAPIView, generics.CreateAPIView, generics.UpdateAPIView, generics.DestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class TodoDetailAPIView(generics.UpdateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
