from django.db import models

class Player(models.Model):
    name = models.CharField(max_length = 180, null=True)

class Round(models.Model):
    timestamp = models.DateTimeField(auto_now_add = True, auto_now = False, blank = True)
    players = models.ManyToManyField(Player)

class PlayerStatus(models.Model):
    __choices = (("computer", "Computer"), ("live-player", "Live Player"))
    preference = models.CharField(max_length = 180, choices=__choices)
    online_status = models.BooleanField(null=True, blank=True)
    occupied = models.BooleanField(null=True, blank=True)
    score = models.IntegerField(default=0)
    round = models.OneToOneField(Round, on_delete=models.CASCADE, null=True, blank=True)
    player = models.OneToOneField(Player, on_delete=models.CASCADE, null=True, blank=True)


