from django.urls import path
from .views import PostListView, PostView, PostCreate, UserProfileView, UserPostsView, PostContactView

urlpatterns = [
    # path('post-list', PostListView.as_view(), name='post-list'),
    path('post-list', PostListView.as_view(), name='post-list'),
    path('post/<pk>', PostView.as_view(), name='post'),
    path('post-create', PostCreate.as_view(), name='post-create'),
    path('userprofile', UserProfileView.as_view(), name='userprofile'),
    path('userposts', UserPostsView.as_view(), name='userposts'),
    path('post-contact', PostContactView.as_view(), name='post-contact'),
]
