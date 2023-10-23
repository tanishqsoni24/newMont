from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import *
from django.contrib.auth.models import User
from .helpers import *
import json
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from dashboard.models import *
from django.utils import timezone
from administ.models import *

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
        # country_code = data.get('country_code')

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
        if invite_code:
            invite_code_obj = Profile.objects.filter(invite_code=invite_code).first()
            if not invite_code_obj:
                return JsonResponse({'status': 'Error', 'message': 'Invalid Invite Code'})

        otp = generate_otp()
        response = send_otp(phone_number, otp)
        if response.status_code == 200:
            user_create_object = User.objects.create_user(username=phone_number, password=password, first_name=first_name, last_name=last_name)
            user_create_object.save()

            user_profile_object = Profile.objects.create(user=user_create_object, phone_number=phone_number, otp=otp)
            user_profile_object.start_timer()
            user_profile_object.save()

            if invite_code:
                recommend_profile = Profile.objects.filter(invite_code=invite_code).first()
                if recommend_profile:
                    user_profile_object.recommended_by = recommend_profile.user
                    user_profile_object.save()
                    recommend_profile.wallet += 50
                    recommend_profile.save()
                    income_object = Income.objects.create(user=recommend_profile.user, amount=50, income_type="Referral", income_date=timezone.now())
                    income_object.save()
                    return JsonResponse({'status': 'Success', 'message': 'OTP Sent'})
                return JsonResponse({'status': 'Error', 'message': 'Invalid Invite Code'})
            return JsonResponse({'status': 'Success', 'message': 'OTP Sent'})
        return JsonResponse({'status': 'Error', 'message': 'OTP Not Sent'})
    return JsonResponse({'status': 'Error', 'message': 'Bad Request'})

@csrf_exempt
def resend_otp(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        phone_number = data.get('phone_number')
        user_profile_object = Profile.objects.filter(phone_number=phone_number).first()
        if user_profile_object:
            otp = generate_otp()
            user_profile_object.otp = otp
            user_profile_object.start_timer()
            user_profile_object.save()
            response = send_otp(phone_number, otp)
            if response.status_code == 200:
                return JsonResponse({'status': 'Success', 'message': 'OTP Sent'})
            return JsonResponse({'status': 'Error', 'message': 'OTP Not Sent'})
        return JsonResponse({'status': 'Error', 'message': 'Phone Number not registered'})
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
                        'is_admin': user_profile_object.is_admin,
                    }
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
        password = data.get('password')
        user_object = User.objects.filter(username=phone_number).first()
        if user_object:
            if user_object.check_password(password):
                user_object.delete()
                return JsonResponse({'status': 'Success', 'message': 'Account Deleted'})
            return JsonResponse({'status': 'Error', 'message': 'Password Incorrect'})
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

            level_1_name = []
            for user in list(level_1):
                user_detail =User.objects.filter(username=user.get("phone_number")).first()
                level_1_name.append(user_detail.first_name + " " + user_detail.last_name)

            level_2_name = []
            for user in list(level_2):
                user_detail = User.objects.filter(username=user.get("phone_number")).first()
                level_2_name.append(user_detail.first_name + " " + user_detail.last_name)
            
            level_3_name = []
            for user in list(level_3):
                user_detail = User.objects.filter(username=user.get("phone_number")).first()
                level_3_name.append(user_detail.first_name + " " + user_detail.last_name)

            myteams = {
                'level_1': level_1_name,
                'level_2': level_2_name,
                'level_3': level_3_name,
            }
            team_size = len(level_1) + len(level_2) + len(level_3)
            team_withdrawal = 0
            for user in level_1:
                team_withdrawal += int(user.get("withdrawal_amount")) if user.get("withdrawal_amount") else 0 
            for user in level_2:
                team_withdrawal += int(user.get("withdrawal_amount")) if user.get("withdrawal_amount") else 0 
            for user in level_3:
                team_withdrawal += int(user.get("withdrawal_amount")) if user.get("withdrawal_amount") else 0 
            team_recharge = 0
            for user in level_1:
                team_recharge += int(user.get("recharge_amount")) if user.get("recharge_amount") else 0
            for user in level_2:
                team_recharge += int(user.get("withdrawal_amount")) if user.get("withdrawal_amount") else 0
            for user in level_3:
                team_recharge += int(user.get("withdrawal_amount")) if user.get("withdrawal_amount") else 0

            print(team_size, team_withdrawal, team_recharge)
            return JsonResponse({'status': 'Success', 'message': 'My Teams', 'myteams' : myteams, "team_size": team_size, "team_withdrawal": team_withdrawal, "team_recharge": team_recharge}) 
        return JsonResponse({'status': 'Error', 'message': 'Phone Number not registered'})
    return JsonResponse({'status': 'Error', 'message': 'Bad Request'})


@csrf_exempt
def recharge(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone_number = data.get('phone_number')
        amount = data.get('amount')
        # payment_id = data.get('reference_number') - after integrating payment gateway
        payment_id = "1234567890"
        user_object = User.objects.filter(username=phone_number).first()
        if user_object:
            try:
            
                admin_user = [user for user in Profile.objects.all() if user.is_admin == True][0]
                if not admin_user:
                    return JsonResponse({'status': 'Error', 'message': 'Admin not found'})
            except Exception as e:
                print(e)
                # return JsonResponse({'status': 'Error', 'message': str(e)})

            user_profile_object = Profile.objects.filter(user=user_object).first()
            if not user_profile_object:
                return JsonResponse({'status': 'Error', 'message': 'User not found'})
            recharge_record_object = Recharge_Record.objects.create(user=user_profile_object, amount=int(amount), date=timezone.now(), user_recharge_payment_id=payment_id)
            recharge_record_object.save()
            return JsonResponse({'status': 'Success', 'message': 'Recharge Successful', 'data': {'wallet': user_profile_object.wallet, 'recharge_amount': user_profile_object.recharge_amount, 'income': user_profile_object.income}})
        return JsonResponse({'status': 'Error', 'message': 'Phone Number not registered'})
    return JsonResponse({'status': 'Error', 'message': 'Bad Request'})

@csrf_exempt
def withdrawl(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone_number = data.get('phone_number')
        amount = data.get('amount')
        bank_card_number = data.get('bank_card_number')
        user_object = User.objects.filter(username=phone_number).first()
        if user_object:
            user_profile_object = Profile.objects.filter(user=user_object).first()
            if user_profile_object.wallet >= int(amount):
                admin_user = [user for user in Profile.objects.all() if user.is_admin == True][0]
                admin_wallet = Admin_wallet.objects.filter(user=admin_user).first()
                if admin_wallet.amount >= int(amount):
                  bank_card = Bank_Card.objects.filter(account_number=bank_card_number).first()
                  withdraw_record_object = Withdraw_Record.objects.create(user=user_profile_object, amount=amount, status=False, date=timezone.now(), bank_card=bank_card)
                  withdraw_record_object.save()
                  return JsonResponse({'status': 'Success', 'message': 'Approval Request Sent', 'data': {'wallet': user_profile_object.wallet}})
                return JsonResponse({'status': 'Error', 'message': "We can't process your request right now."})
            return JsonResponse({'status': 'Error', 'message': 'Withdrawl Amount Greater than Wallet Amount'})
        return JsonResponse({'status': 'Error', 'message': 'Phone Number not registered'})
    return JsonResponse({'status': 'Error', 'message': 'Bad Request'})

@csrf_exempt
def add_bank_card(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone_number = data.get('phone_number')
        card_holder_name = data.get('card_holder_name')
        card_number = data.get('card_number')
        ifsc_code = data.get('ifsc_code')
        bank_name = data.get('bank_name')
        user_object = User.objects.filter(username=phone_number).first()
        
        if user_object:
            user_profile_object = Profile.objects.filter(user=user_object).first()
            print(data)
            bank_card_object = Bank_Card.objects.create(user=user_profile_object, card_holder_name=card_holder_name, account_number=card_number, ifsc_code=ifsc_code, bank_name=bank_name)
            bank_card_object.save()
            print(bank_card_object)
            return JsonResponse({'status': 'Success', 'message': 'Bank Card Added'})
        return JsonResponse({'status': 'Error', 'message': 'Phone Number not registered'})
    return JsonResponse({'status': 'Error', 'message': 'Bad Request'})


@csrf_exempt
def my_withdraw_requests(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone_number = data.get('phone_number')
        user_object = User.objects.filter(username=phone_number).first()
        if user_object:
            user_profile_object = Profile.objects.filter(user=user_object).first()
            withdraw_records = Withdraw_Record.objects.filter(user=user_profile_object).values()
            withdraw_records = [
                {
                    'amount': withdraw_record['amount'],
                    'status': withdraw_record['status'],
                    'date': withdraw_record['date'].strftime("%B-%d-%Y")+ " at " + withdraw_record['date'].strftime("%H:%M:%S"),
                }
                for withdraw_record in withdraw_records
            ]
            withdraw_records = sorted(withdraw_records, key=lambda k: k['date'], reverse=True)
            return JsonResponse({'status': 'Success', 'message': 'My Withdraw Requests', 'data': withdraw_records})
        return JsonResponse({'status': 'Error', 'message': 'Phone Number not registered'})
    return JsonResponse({'status': 'Error', 'message': 'Bad Request'})


@csrf_exempt
def change_password(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone_number = data.get('phone_number')
        old_password = data.get('oldPassword')
        new_password = data.get('newPassword')
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
def user_detail(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone_number = data.get('phone_number')
        user_object = User.objects.filter(username=phone_number).first()
        if user_object:
            user_profile_object = Profile.objects.filter(user=user_object).first()
            data = {
                'wallet': user_profile_object.wallet,
                'recharge_amount': user_profile_object.recharge_amount,
                'income': user_profile_object.income,
            }
            return JsonResponse({'status': 'Success', 'message': 'User Details', 'data': data})
        return JsonResponse({'status': 'Error', 'message': 'Phone Number not registered'})
    return JsonResponse({'status': 'Error', 'message': 'Bad Request'})

@csrf_exempt
def orders(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone_number = data.get('phone_number')
        user_object = User.objects.filter(username=phone_number).first()
        if user_object:
            user_profile_object = Profile.objects.filter(user=user_object).first()
            orders = Orders.objects.filter(user=user_profile_object).all()
            data = []
            for order in orders:
                data.append({
                    'product_name': order.product.name,
                    'product_price': order.product.price,
                    'date_purchase': order.date_purchase.strftime("%B-%d-%Y"),
                })
            return JsonResponse({'status': 'Success', 'message': 'Orders', 'data': data})
        return JsonResponse({'status': 'Error', 'message': 'Phone Number not registered'})
    return JsonResponse({'status': 'Error', 'message': 'Bad Request'})

@csrf_exempt
def show_my_recharge_request(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone_number = data.get('phone_number')
        user_object = User.objects.filter(username=phone_number).first()
        if user_object:
            user_profile_object = Profile.objects.filter(user=user_object).first()
            recharge_records = Recharge_Record.objects.filter(user=user_profile_object).values()
            recharge = [
                {
                    'amount': recharge_record['amount'],
                    'status': recharge_record['status'],
                    'date': recharge_record['date'].strftime("%B-%d-%Y")+ " at " + recharge_record['date'].strftime("%H:%M:%S"),
                    'payment_id': recharge_record['user_recharge_payment_id'],
                }
                for recharge_record in recharge_records
            ]
            return JsonResponse({'status': 'Success', 'message': 'My Recharge Requests', 'data': recharge})
        return JsonResponse({'status': 'Error', 'message': 'Phone Number not registered'})
    return JsonResponse({'status': 'Error', 'message': 'Bad Request'})

@csrf_exempt
def show_my_bank_cards(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone_number = data.get('phone_number')
        user_object = User.objects.filter(username=phone_number).first()
        if user_object:
            user_profile_object = Profile.objects.filter(user=user_object).first()
            bank_cards = Bank_Card.objects.filter(user=user_profile_object).values()
            bank_cards = [
                {
                    'card_holder_name': bank_card['card_holder_name'],
                    'card_number': bank_card['account_number'],
                    'ifsc_code': bank_card['ifsc_code'],
                    'bank_name': bank_card['bank_name'],
                }
                for bank_card in bank_cards
            ]
            return JsonResponse({'status': 'Success', 'message': 'My Bank Cards', 'data': bank_cards})
        return JsonResponse({'status': 'Error', 'message': 'Phone Number not registered'})
    return JsonResponse({'status': 'Error', 'message': 'Bad Request'})