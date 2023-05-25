from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        app_label = 'todo_backend'
        model = Todo
        fields = ('id', 'title', 'completed', 'description')
