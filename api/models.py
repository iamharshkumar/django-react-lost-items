from django.contrib.auth.models import User
from django.db import models

from django.db.models.signals import post_save


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    contact = models.IntegerField(null=True)

    def __str__(self):
        return self.user.username

    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            UserProfile.objects.create(user=instance)

    post_save.connect(create_user_profile, sender=User)


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=True)
    description = models.CharField(max_length=100, null=True)
    image = models.ImageField(upload_to='post', null=True)
    type = models.CharField(max_length=10, choices=(('lost', 'lost'), ('found', 'found')))
    active = models.BooleanField(default=False, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username + ':' + self.name
