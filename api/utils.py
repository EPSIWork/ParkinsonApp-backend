from rest_framework.response import Response
from rest_framework import status
from file.serializer import FileSerializer


def save_aws_file(file):
    try:
        max_size = 1024 * 1024 * 5  # 5 MB
        if not file.name.endswith(('.pdf', '.jpg', '.jpeg', '.png', '.docx')):
            return Response({"error": "Invalid file type. Only PDF, JPG, JPEG, PNG, and DOCX files are allowed."}, status=status.HTTP_400_BAD_REQUEST)
        if file.size == 0:
            return Response({"error": "File photo size must be greater than 0 bytes."}, status=status.HTTP_400_BAD_REQUEST)
        if file.size > max_size:
                return Response({"error": f"File photo size must be less than {max_size} bytes."}, status=status.HTTP_400_BAD_REQUEST)
        file_type = 'OTHER'
        if file.name.endswith('.pdf'):
            file_type = 'PDF'
        elif file.name.endswith(('.jpg', '.jpeg', '.png')):
            file_type = 'IMAGE'
        elif file.name.endswith('.docx'):
            file_type = 'DOCS'
        data = {
            'url': file,
            'original_name': file.name,
            'type': file_type
        }
        serializer = FileSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        return serializer.save().id
    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

def send_websocket_event(user_id, message):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f"user_{user_id}",  # Channel name for the specific user
        {
            "type": "send_notification",
            "message": "This is a notification message.",
        }
    )

