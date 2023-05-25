from rest_framework import generics
from .models import Todo
from .serializers import TodoSerializer

class TodoListAPIView(generics.ListAPIView, generics.CreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
