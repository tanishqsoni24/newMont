import uuid
import random
from twilio.rest import Client
from django.http import JsonResponse
from django.conf import settings

def generate_ref_code():
    code = str(uuid.uuid4()).replace("-", "")[:12]
    return code

def generate_otp():
    otp = str(random.randint(100000, 999999))
    return otp

def send_otp(phone, otp):
    account_sid = settings.ACCOUNT_SID
    auth_token = settings.AUTH_TOKEN
    client = Client(account_sid, auth_token)

    try:
        message = client.messages.create(
            from_='+12313594239',
            body=f'Your otp is {otp}',
            to=f'+91{phone}'
        )
        return JsonResponse({'status': "success broooo", 'message': message.sid})
    except Exception as e:
        print("here",e)
        return JsonResponse({'status': message.error_code, 'message': str(message.error_message)})
    
send_otp(8445933567, 123456)