from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import *
from .serializers import *
from rest_framework import viewsets
from django.http import request, HttpResponse,JsonResponse
import random
import json


class PlayerView(APIView):
    def get(self, request, *args, **kwargs):
        object_list = Player.objects.all()
        serializer = PlayerSerializer(object_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = {
            #'name': request.data.get('name')
        }
        serializer = PlayerSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def play(request):
    id = request.GET.get('id')
    name = request.GET.get('name')
    preference = request.GET.get('preference')
    online_status = request.GET.get('online_status')
    if not id: id = None
    if not name: name = "Anonymous"+str(random.randint(1, 999))
    
    player = Player.objects.update_or_create(id=id, defaults={"name": name})
    player = player[0]
    playerstatus = PlayerStatus.objects.update_or_create(player=player.id, defaults={"player":player,  "preference": preference, "online_status": online_status, "occupied": True})
    playerstatus = playerstatus[0]

    JSON_Output = dict()
    JSON_Output['player'] = {'id': player.pk, 'name': player.name, 'preference': playerstatus.preference, 'online_status': playerstatus.online_status, 'score': playerstatus.score }
    if playerstatus.preference == "live-player":
        opponent = PlayerStatus.objects.filter(online_status=True, preference = "live-player").exclude(player__id=player.pk).first()
        if opponent:
            JSON_Output['opponent'] = {'id': opponent.player.pk, 'name': opponent.player.name, 'preference': opponent.preference, 'online_status': opponent.online_status, 'score': opponent.score}
        else:
            JSON_Output['opponent']  = {}

    round = Round.objects.create()
    round.players.add(player)
    if playerstatus.preference == "live-player" and opponent:
        round.players.add(opponent.player)

    playerstatus.round = round
    playerstatus.save()


    JSON_Output['round'] = {'id': round.pk, 'timestamp': str(round.timestamp)}

    return HttpResponse(json.dumps(JSON_Output, default=str), content_type="application/json")

