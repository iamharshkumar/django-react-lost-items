from django.contrib.auth.models import User
from drf_yasg.utils import swagger_auto_schema
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
    permission_classes = [IsAuthenticated, ]
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class PostListView(APIView):
    serializer_class = PostSerializer

    @swagger_auto_schema(responses={200: PostSerializer(many=True)})
    def post(self, request):
        q = request.data.get('type')
        post = []
        all_count = 0
        lost_count = 0
        found_count = 0

        if q == 'all':
            post = Post.objects.filter(active=True).order_by('-timestamp')
        else:
            post=Post.objects.filter(type=q, active=True).order_by('-timestamp')
            
        all_count = Post.objects.filter(active=True).count()
        lost_count = Post.objects.filter(type='lost', active=True).count()
        found_count = Post.objects.filter(type='found', active=True).count()

        serializer = self.serializer_class(post, many=True).data
        return Response(
            {'posts': serializer, 'all_count': all_count, 'lost_count': lost_count, 'found_count': found_count},
            status=HTTP_200_OK)


class PostCreate(APIView):
    permission_classes = [IsAuthenticated, ]

    @swagger_auto_schema(request_body=PostSerializer, responses={200: PostSerializer(many=False)})
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

    def post(self, request):
        user = User.objects.get(username=request.user)
        email = request.data.get('email')
        contact = request.data.get('contact')

        user = User.objects.get(username=request.user)
        userProfile = UserProfile.objects.get(user=user)
        user.email = email
        userProfile.contact = contact
        user.save()
        userProfile.save()
        return Response({'message': 'Profile update successfully'}, status=HTTP_200_OK)


class UserPostsView(APIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        user = User.objects.get(username=request.user)
        q = request.data.get('type')
        
        posts = Post.objects.filter(user=user, active=(q == 'Active Post')).order_by('-timestamp')
        serializer = self.serializer_class(posts, many=True).data
        return Response(serializer, status=HTTP_200_OK)
 


class PostContactView(APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        post_id = request.data.get('post_id')
        post = Post.objects.get(id=post_id)
        user = UserProfile.objects.get(user=post.user)
        contact = user.contact
        email = user.user.email
        return Response({'contact': contact, 'email': email}, status=HTTP_200_OK)
