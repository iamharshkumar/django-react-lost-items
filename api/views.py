from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_200_OK
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, DestroyAPIView, \
    RetrieveUpdateDestroyAPIView
from .serializers import PostSerializer, UserProfileSerializer
from .models import Post, UserProfile


# Create your views here.
# class PostListView(ListAPIView):
#     serializer_class = PostSerializer
#     queryset = Post.objects.all().order_by('-timestamp')


class PostView(RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class PostListView(APIView):
    serializer_class = PostSerializer

    def post(self, request):
        q = request.data.get('type')
        post = []
        all_count = 0
        lost_count = 0
        found_count = 0

        if q == 'all':
            post = Post.objects.filter(active=True).order_by('-timestamp')
        if q == 'lost':
            post = Post.objects.filter(type='lost', active=True).order_by('-timestamp')
        if q == 'found':
            post = Post.objects.filter(type='found', active=True).order_by('-timestamp')
        all_count = Post.objects.filter(active=True).count()
        lost_count = Post.objects.filter(type='lost', active=True).count()
        found_count = Post.objects.filter(type='found', active=True).count()

        serializer = self.serializer_class(post, many=True).data
        return Response(
            {'posts': serializer, 'all_count': all_count, 'lost_count': lost_count, 'found_count': found_count},
            status=HTTP_200_OK)


class PostCreate(APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        user = User.objects.get(username=request.user)
        name = request.data.get('name')
        description = request.data.get('description')
        image = request.data.get('image')
        type = request.data.get('type')

        if user:
            post = Post.objects.create(user=user, name=name, description=description, image=image, type=type)
            return Response({'message': 'Post create successfully'}, status=HTTP_201_CREATED)

        return Response({'message': 'Something went wrong'}, status=HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        user = User.objects.get(username=request.user)
        q = UserProfile.objects.get(user=user)
        serializer = self.serializer_class(q, many=False).data
        return Response(serializer, status=HTTP_200_OK)


class UserPostsView(APIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        user = User.objects.get(username=request.user)
        q = request.data.get('type')

        if q == 'Active Post':
            posts = Post.objects.filter(user=user, active=True).order_by('-timestamp')
            serializer = self.serializer_class(posts, many=True).data
            return Response(serializer, status=HTTP_200_OK)
        if q == 'Pending Post':
            posts = Post.objects.filter(user=user, active=False).order_by('-timestamp')
            serializer = self.serializer_class(posts, many=True).data
            return Response(serializer, status=HTTP_200_OK)
        return Response({'message': 'Something went wrong'}, status=HTTP_400_BAD_REQUEST)
