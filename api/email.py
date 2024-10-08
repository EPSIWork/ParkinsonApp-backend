from django.core.mail import send_mail
from django.http import JsonResponse
from sewema import settings

def sendMail(subject, number, email):
    try :
        from_email = settings.EMAIL_HOST_USER 
        recipient_list = [email]
        send_mail(subject, number, from_email, recipient_list)
    except Exception as e:
        data ={
            "status":False,
            "error":str(e)
        }
        return JsonResponse(data)
