from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Profile
from django.contrib.auth.models import User
from .helpers import *
import json
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt

from dashboard.models import Recharge_Record
from django.utils import timezone

# Create your views here.

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        phone_number = data.get('phone_number')
        invite_code = data.get('invite_code')
        password = data.get('password')
        country_code = data.get('country_code')

        print(data)

        if not phone_number:
            return JsonResponse({'status': 'Error', 'message': 'Phone Number not provided'})
        if not password:
            return JsonResponse({'status': 'Error', 'message': 'Password not provided'})
        if len(phone_number) != 10:
            return JsonResponse({'status': 'Error', 'message': 'Phone Number Invalid'})
        # if country_code != '+91':
        #     return JsonResponse({'status': 'Error', 'message': 'Country Code Invalid'})

        user_obj = Profile.objects.filter(phone_number=phone_number).first()
        if user_obj:
            return JsonResponse({'status': 'Error', 'message': 'Phone Number already registered'})
        user_create_object = User.objects.create_user(username=phone_number, password=password, first_name=first_name, last_name=last_name)
        user_create_object.save()

        otp = generate_otp()
        print(otp)
        user_profile_object = Profile.objects.create(user=user_create_object, phone_number=phone_number, otp=otp)
        print("here")
        user_profile_object.start_timer()
        print("here 2")
        user_profile_object.save()
        print("here 3")

        response = send_otp(phone_number, otp)
        if response.status_code == 200:
            if invite_code:
                user_profile_object.recommended_by = Profile.objects.filter(invite_code=invite_code).first().user
                user_profile_object.save()
            return JsonResponse({'status': 'Success', 'message': 'OTP Sent'})
        else:
            return JsonResponse({'status': 'Error', 'message': 'OTP Not Sent'})
    return JsonResponse({'status': 'Error', 'message': 'Bad Request'})

@csrf_exempt
def activate_account(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        phone_number = data.get('phone_number')
        otp = data.get('otp')
        user_profile_object = Profile.objects.filter(phone_number=phone_number).first()
        if user_profile_object:
            if user_profile_object.otp == otp and user_profile_object.start_time + timezone.timedelta(minutes=1) > timezone.now():                
                user_profile_object.is_verified = True
                user_profile_object.save()
                return JsonResponse({'status': 'Success', 'message': 'Account Activated'})
            return JsonResponse({'status': 'Error', 'message': 'OTP Incorrect'})
        return JsonResponse({'status': 'Error', 'message': 'Phone Number not registered'})
    return JsonResponse({'status': 'Error', 'message': 'Bad Request'})

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        phone_number = data.get('phone_number')
        password = data.get('password')
        user_object = User.objects.filter(username=phone_number).first()
        if user_object:
            if user_object.check_password(password):
                user_profile_object = Profile.objects.filter(user=user_object).first()
                if user_profile_object.is_verified:
                    data = {
                        'first_name': user_object.first_name,
                        'last_name': user_object.last_name,
                        'phone_number': user_object.username,
                        'country_code': '+91',
                        'invite_code': user_profile_object.invite_code,
                        'is_verified': user_profile_object.is_verified,
                        'is_active': user_object.is_active,
                        'wallet': user_profile_object.wallet,
                        'recharge_amount': user_profile_object.recharge_amount,
                        'income': user_profile_object.income,
                    }
                    print(user_profile_object.wallet, user_profile_object.recharge_amount, user_profile_object.income)
                    return JsonResponse({'status': 'Success', 'message': 'Logged In', 'data': data})
                return JsonResponse({'status': 'Error', 'message': 'Account not activated'})
            return JsonResponse({'status': 'Error', 'message': 'Password Incorrect'})
        return JsonResponse({'status': 'Error', 'message': 'Phone Number not registered'})
    return JsonResponse({'status': 'Error', 'message': 'Bad Request'})

@csrf_exempt
def forogt_password(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        phone_number = data.get('phone_number')
        user_object = User.objects.filter(username=phone_number).first()
        if user_object:
            token = generate_otp()
            user_profile_object = Profile.objects.filter(user=user_object).first()
            user_profile_object.forgot_password_token = token
            user_profile_object.forgot_password_token_timer()
            user_profile_object.save()
            response = send_otp(phone_number, token)
            if response.status_code == 200:
                return JsonResponse({'status': 'Success', 'message': 'OTP Sent'})
            return JsonResponse({'status': 'Error', 'message': 'OTP Not Sent'})
        return JsonResponse({'status': 'Error', 'message': 'Phone Number not registered'})
    return JsonResponse({'status': 'Error', 'message': 'Bad Request'})

@csrf_exempt
def verify_forgot_password_token(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        phone_number = data.get('phone_number')
        otp = data.get('otp')
        user_profile_object = Profile.objects.filter(phone_number=phone_number).first()
        if user_profile_object:
            if user_profile_object.forgot_password_token == otp and user_profile_object.forgot_password_token_start_time + timezone.timedelta(minutes=1) > timezone.now():                
                return JsonResponse({'status': 'Success', 'message': 'OTP Correct'})
            return JsonResponse({'status': 'Error', 'message': 'OTP Incorrect'})
        return JsonResponse({'status': 'Error', 'message': 'Phone Number not registered'})
    return JsonResponse({'status': 'Error', 'message': 'Bad Request'})

@csrf_exempt
def reset_password(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        phone_number = data.get('phone_number')
        password = data.get('password')
        user_profile_object = Profile.objects.filter(phone_number=phone_number).first()
        if user_profile_object:
            user_object = user_profile_object.user
            user_object.set_password(password)
            user_object.save()
            return JsonResponse({'status': 'Success', 'message': 'Password Reset Successfully'})
        return JsonResponse({'status': 'Error', 'message': 'Phone Number not registered'})
    return JsonResponse({'status': 'Error', 'message': 'Bad Request'})

@csrf_exempt
def change_my_password(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        phone_number = data.get('phone_number')
        old_password = data.get('old_password')
        new_password = data.get('new_password')
        user_object = User.objects.filter(username=phone_number).first()
        if user_object:
            if user_object.check_password(old_password):
                user_object.set_password(new_password)
                user_object.save()
                return JsonResponse({'status': 'Success', 'message': 'Password Changed'})
            return JsonResponse({'status': 'Error', 'message': 'Old Password Incorrect'})
        return JsonResponse({'status': 'Error', 'message': 'Phone Number not registered'})
    return JsonResponse({'status': 'Error', 'message': 'Bad Request'})

@csrf_exempt
def delete_account(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        phone_number = data.get('phone_number')
        user_object = User.objects.filter(username=phone_number).first()
        if user_object:
            user_object.delete()
            return JsonResponse({'status': 'Success', 'message': 'Account Deleted'})
        return JsonResponse({'status': 'Error', 'message': 'Phone Number not registered'})
    return JsonResponse({'status': 'Error', 'message': 'Bad Request'})

@csrf_exempt
def my_teams(request):  
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone_number = data.get('phone_number')
        user_object = User.objects.filter(username=phone_number).first()
        if user_object:
            level_1 = Profile.objects.filter(recommended_by=user_object).values()
            level_2 = []
            level_3 = []
            for i in level_1:
                level_2 += Profile.objects.filter(recommended_by=i['user_id']).values()
            for i in level_2:
                level_3 += Profile.objects.filter(recommended_by=i['user_id']).values()
            myteams = {
                'level_1': list(level_1),
                'level_2': list(level_2),
                'level_3': list(level_3)
            }

            return JsonResponse({'status': 'Success', 'message': 'My Teams', 'myteams' : myteams })
        return JsonResponse({'status': 'Error', 'message': 'Phone Number not registered'})
    return JsonResponse({'status': 'Error', 'message': 'Bad Request'})


@csrf_exempt
def recharge(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone_number = data.get('phone_number')
        amount = data.get('amount')
        user_object = User.objects.filter(username=phone_number).first()
        if user_object:
            user_profile_object = Profile.objects.filter(user=user_object).first()
            print(user_profile_object.wallet, user_profile_object.recharge_amount, user_profile_object.income)
            user_profile_object.wallet = user_profile_object.wallet + int(amount)
            user_profile_object.recharge_amount = user_profile_object.recharge_amount + int(amount)
            user_profile_object.save()

            recharge_record_object = Recharge_Record.objects.create(user=user_profile_object, amount=amount, status=True, date=timezone.now(), amount_left=user_profile_object.wallet)
            recharge_record_object.save()

            print(recharge_record_object.status, recharge_record_object.amount, recharge_record_object.date, recharge_record_object.amount_left)



            return JsonResponse({'status': 'Success', 'message': 'Recharge Successful', 'data': {'wallet': user_profile_object.wallet, 'recharge_amount': user_profile_object.recharge_amount, 'income': user_profile_object.income}})
        return JsonResponse({'status': 'Error', 'message': 'Phone Number not registered'})
    return JsonResponse({'status': 'Error', 'message': 'Bad Request'})
