from rest_framework import serializers
from .models import Post, UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = (
            'id',
            'username',
            'email',
            'contact'
        )

    def get_username(self, obj):
        return obj.user.username

    def get_email(self, obj):
        return obj.user.email


class PostSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = (
            'id',
            'user',
            'name',
            'description',
            'image',
            'type',
            'active',
            'timestamp'
        )

    def get_user(self, obj):
        return obj.user.username
