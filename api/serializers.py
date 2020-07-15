from rest_framework import serializers
from .models import Post


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
