import uuid
import random
import re
from twilio.rest import Client
from django.http import JsonResponse
from django.conf import settings
from django.core.mail import send_mail
from django.conf import settings

def email_verifier(email):
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    if(re.fullmatch(regex, email)):
        return True
    return False

def generate_ref_code():
    code = str(uuid.uuid4()).replace("-", "")[:12]
    return code

def generate_otp():
    otp = str(random.randint(100000, 999999))
    return otp

# def send_otp(phone, otp):
#     account_sid = settings.ACCOUNT_SID
#     auth_token = settings.AUTH_TOKEN
#     client = Client(account_sid, auth_token)

#     try:
#         message = client.messages.create(
#             from_='+12313594239',
#             body=f'Your otp is {otp}',
#             to=f'+91{phone}'
#         )
#         return JsonResponse({'status': "success broooo", 'message': message.sid})
#     except Exception as e:
#         print("here",e)
#         return JsonResponse({'status': message.error_code, 'message': str(message.error_message)})
    
def send_otp(email, otp):
    subject = "OTP for Account Activation"
    email_from = settings.EMAIL_HOST_USER
    message = f"Your OTP for Acount Activation is : \n {otp}"
    send_mail(subject,'', email_from, [email], html_message=message)
    return True
