from channels.generic.websocket import AsyncWebsocketConsumer

class UserNotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']
        # You may perform additional authentication/authorization checks here
        await self.accept()

    async def disconnect(self, close_code):
        # Clean up any connections, if needed
        pass

    async def receive(self, text_data):
        # Handle incoming messages, if needed
        pass

    async def send_notification(self, event):
        # Send notification to the client
        await self.send(text_data=event['message'])
