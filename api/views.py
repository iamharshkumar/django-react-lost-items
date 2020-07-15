from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, DestroyAPIView, \
    RetrieveUpdateDestroyAPIView
from .serializers import PostSerializer
from .models import Post


# Create your views here.
class PostListView(ListAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class PostView(RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
