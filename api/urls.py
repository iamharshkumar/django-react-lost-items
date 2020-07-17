from django.urls import path
from .views import PostListView, PostView, PostCreate

urlpatterns = [
    # path('post-list', PostListView.as_view(), name='post-list'),
    path('post-list', PostListView.as_view(), name='post-list'),
    path('post/<pk>', PostView.as_view(), name='post'),
    path('post-create', PostCreate.as_view(), name='post-create'),
]