from django.urls import path
from .views import PostListView, PostView

urlpatterns = [
    path('post-list', PostListView.as_view(), name='post-list'),
    path('post/<pk>', PostView.as_view(), name='post')
]