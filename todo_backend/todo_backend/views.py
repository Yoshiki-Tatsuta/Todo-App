from rest_framework import generics
from .models import Todo
from .serializers import TodoSerializer
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from datetime import datetime

class TodoListAPIView(generics.ListAPIView, generics.CreateAPIView, generics.UpdateAPIView, generics.DestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    
    def create(self, request, *args, **kwargs):
        # リクエストデータから日付を取得
        date_string = request.data.get('date')
        
        # 日付文字列をdatetimeオブジェクトに変換
        if date_string:
            date_object = datetime.strptime(date_string, "%Y-%m-%d")
            request.data['date'] = date_object.date()
        
        return super().create(request, *args, **kwargs)
    

class TodoDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
