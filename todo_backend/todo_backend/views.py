from rest_framework import generics
from .models import Todo
from .serializers import TodoSerializer
from rest_framework.generics import RetrieveUpdateDestroyAPIView

class TodoListAPIView(generics.ListAPIView, generics.CreateAPIView, generics.UpdateAPIView, generics.DestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class TodoDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
