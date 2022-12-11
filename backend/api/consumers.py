import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import Player

class WebSocketConsumer(WebsocketConsumer):
    def connect(self):
        self.round_id = self.scope['url_route']['kwargs']['round_id']
        self.room_group_name = "test"
        #self.room_group_name = 'round_%s' % self.round_id

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json
        print(text_data_json)

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type':'play',
                'message': message
            }
        )
        
    def play(self, event):
            message = event['message']

            self.send(text_data=json.dumps({
                'type':'play',
                'message':message
            }))

    

