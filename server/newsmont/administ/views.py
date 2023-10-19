from django.shortcuts import render
import json
from accounts.models import *
from dashboard.models import *
from administ.models import * 
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

@csrf_exempt
def admin_login(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone = data.get("phone_number")
        password = data.get("password")
        admin = Profile.objects.filter(phone_number=phone).first()
        if admin:
            if admin.is_admin:
                if admin.user.check_password(password):
                    data = {
                        "first_name": admin.user.first_name,
                        "last_name": admin.user.last_name,
                        "phone_number": admin.phone_number,
                        "invite_code": admin.invite_code,
                    }
                    return JsonResponse({"status": "Success", "message": "logged in successfully", "data": data})
                return JsonResponse({"status": "Failed", "message": "Invalid Password"})
            return JsonResponse({"status": "Failed", "message": "You are not an admin"})
        return JsonResponse({"status": "Failed", "message": "Invalid Phone Number"})
    return JsonResponse({"status": "Failed", "message": "Invalid Request Method"})

@csrf_exempt
def admin_index(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone = data.get("phone_number")
        admin = Profile.objects.filter(phone_number=phone).first()
        if admin:
            if admin.is_admin:
                recharge_records = Recharge_Record.objects.all()
                withdraw_records = Withdraw_Record.objects.all()
                users = Profile.objects.all()
                products = Product.objects.all()
                recharge_records_details = []
                withdraw_records_details = []
                users_details = []
                products_details = []
                for record in recharge_records:
                    recharge_records_details.append({
                        "id": record.uid,
                        "user": record.user.user.first_name,
                        "amount": record.amount,
                        "status": record.status,
                        "date": record.date,
                        # "ref_num": record.ref_num,
                    })
                for record in withdraw_records:
                    withdraw_records_details.append({
                        "id": record.uid,
                        "user": record.user.user.first_name,
                        "amount": record.amount,
                        "status": record.status,
                        "date": record.date.strftime("%B-%d-%Y") + " at " + record.date.strftime("%I:%M %p"),
                        "bank_card": record.bank_card.account_number,
                        "ifsc_code": record.bank_card.ifsc_code,
                        "account_holder_name": record.bank_card.card_holder_name,
                    })
                for user in users:
                    users_details.append({
                        "id": user.uid,
                        "name": user.user.first_name,
                        "phone_number": user.phone_number,
                        "invite_code": user.invite_code,
                        "is_verified": user.is_verified,
                        "start_time": user.start_time,
                        "recommended_by": user.recommended_by.user.first_name if user.recommended_by else None,
                        "vip_level": user.vip_level,
                        "wallet": user.wallet,
                        "recharge_amount": user.recharge_amount,
                        "income": user.income,
                        "is_admin": user.is_admin
                    })
                for product in products:
                    products_details.append({
                        "id": product.uid,
                        "name": product.name,
                        "slug": product.slug,
                        "category": product.category.name,
                        "price": product.price,
                        "eligible_for_vip_number": product.eligible_for_vip_number,
                        "image": product.image.url,
                        "days": product.days,
                        "daily_income": product.daily_income,
                        "total_income": product.total_income
                    })
                return JsonResponse({"status": "Success", "message": "logged in successfully and data is sent!", "recharge_records": recharge_records_details, "withdraw_records_details": withdraw_records_details, "users_details": users_details, "products_details": products_details})
            return JsonResponse({"status": "Failed", "message": "You are not an admin"})
        return JsonResponse({"status": "Failed", "message": "Invalid Phone Number"})
    return JsonResponse({"status": "Failed", "message": "Invalid Request Method"})
    
@csrf_exempt
def show_withdrawl_requests(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone = data.get("phone_number")
        withdraw_records = Withdraw_Record.objects.all()
        withdraw_records_details = []
        for record in withdraw_records:
            withdraw_records_details.append({
                "id": record.uid,
                "user": record.user.user.first_name,
                "phone": record.user.phone_number,
                "amount": record.amount,
                "status": record.status,
                "date": str(record.date.strftime("%B-%d-%Y")),
                "account_number": record.bank_card.account_number,
                "ifsc_code": record.bank_card.ifsc_code,
                "card_holder_name": record.bank_card.card_holder_name
            })
        return JsonResponse({"status": "Success", "logged in successfully and data is sent!": withdraw_records_details})
    return JsonResponse({"status": "Failed", "message": "Invalid Request"})

@csrf_exempt
def show_recharge_requests(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone = data.get("phone_number")
        recharge_records = Recharge_Record.objects.all()
        recharge_records_details = []
        for record in recharge_records:
            recharge_records_details.append({
                "id": record.uid,
                "user": record.user.user.first_name,
                "phone": record.user.phone_number,
                "amount": record.amount,
                "status": record.status,
                "date": str(record.date.strftime("%B-%d-%Y")),
                "amount_left": record.amount_left
            })
        return JsonResponse({"status": "Success", "logged in successfully and data is sent!": recharge_records_details})
    return JsonResponse({"status": "Failed", "message": "Invalid Request"})

@csrf_exempt
def show_users(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone = data.get("phone_number")
        users = Profile.objects.all()
        users_details = []
        for user in users:
            users_details.append({
                "id": user.uid,
                "name": user.user.first_name,
                "phone_number": user.phone_number,
                "invite_code": user.invite_code,
                "is_verified": user.is_verified,
                "start_time": user.start_time,
                "recommended_by": user.recommended_by.user.first_name,
                "vip_level": user.vip_level,
                "wallet": user.wallet,
                "recharge_amount": user.recharge_amount,
                "income": user.income,
                "is_admin": user.is_admin
            })
        return JsonResponse({"status": "Success", "logged in successfully and data is sent!": users_details})
    return JsonResponse({"status": "Failed", "message": "Invalid Request"})

@csrf_exempt
def show_products(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone = data.get("phone_number")
        products = Product.objects.all()
        products_details = []
        for product in products:
            products_details.append({
                "id": product.uid,
                "name": product.name,
                "slug": product.slug,
                "category": product.category.name,
                "price": product.price,
                "eligible_for_vip_number": product.eligible_for_vip_number,
                "image": product.image.url,
                "days": product.days,
                "daily_income": product.daily_income,
                "total_income": product.total_income
            })
        return JsonResponse({"status": "Success", "logged in successfully and data is sent!": products_details})
    return JsonResponse({"status": "Failed", "message": "Invalid Request"})

@csrf_exempt
def userwise_recharge_records(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone = data.get("phone_number")
        user = Profile.objects.filter(phone_number=phone).first()
        recharge_records = Recharge_Record.objects.filter(user=user).all()
        recharge_records_details = []
        for record in recharge_records:
            recharge_records_details.append({
                "id": record.uid,
                "user": record.user.user.first_name,
                "amount": record.amount,
                "status": record.status,
                "date": record.date,
                "amount_left": record.amount_left
            })
        return JsonResponse({"status": "Success", "logged in successfully and data is sent!": recharge_records_details})
    return JsonResponse({"status": "Failed", "message": "Invalid Request"})

@csrf_exempt
def userwise_withdraw_records(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone = data.get("phone_number")
        user = Profile.objects.filter(phone_number=phone).first()
        withdraw_records = Withdraw_Record.objects.filter(user=user).all()
        withdraw_records_details = []
        for record in withdraw_records:
            withdraw_records_details.append({
                "id": record.uid,
                "user": record.user.user.first_name,
                "amount": record.amount,
                "status": record.status,
                "date": record.date,
                "bank_card": record.bank_card.card_number
            })
        return JsonResponse({"status": "Success", "logged in successfully and data is sent!": withdraw_records_details})
    return JsonResponse({"status": "Failed", "message": "Invalid Request"})

@csrf_exempt
def send_response_to_ref_num(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        uid = data.get("withdraw_id")
        ref_num = data.get("ref_num")
        withdraw_record = Withdraw_Record.objects.filter(uid=uid).first()
        if withdraw_record:
            admin_user = [user for user in Profile.objects.all() if user.is_admin == True][0]
            admin_wallet = Admin_wallet.objects.filter(user=admin_user).first()
            if withdraw_record.amount < admin_wallet.amount:
                withdraw_record.status = True
                withdraw_record.ref_num = ref_num
                withdraw_record.update_paid_date()
                withdraw_record.save()
                # sum of all the withdraw amounts of that user
                user = withdraw_record.user
                user.wallet = user.wallet - withdraw_record.amount
                user.save()

                # update admin wallet
                admin_wallet.amount = admin_wallet.amount - withdraw_record.amount
                admin_wallet.save()

                # send these data into json format
                json_data = {
                    "status": "Success",
                    "message": "Paid Successfully",
                    "wallet_amount": user.wallet
                }
                return JsonResponse(json_data)
            return JsonResponse({"status": "Failed", "message": "Insufficient Balance"})
        return JsonResponse({"status": "Failed", "message": "Invalid Referral Number"})

@csrf_exempt
def approved_recharge_records(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        recharge_records = Recharge_Record.objects.filter(status=True).all()
        recharge_records_details = []
        for record in recharge_records:
            recharge_records_details.append({
                "id": record.uid,
                "user": record.user.user.first_name,
                "amount": record.amount,
                "status": record.status,
                "date": record.date,
                "amount_left": record.amount_left
            })
        return JsonResponse({"status": "Success", "Data is sent!": recharge_records_details})
    return JsonResponse({"status": "Failed", "message": "Invalid Request"})

@csrf_exempt
def approve_recharge_record(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        uid = data.get("recharge_id")
        recharge_record = Recharge_Record.objects.filter(uid=uid).first()
        if recharge_record:
            recharge_record.status = True
            recharge_record.save()
            
            #update admin wallet
            admin_user = [user for user in Profile.objects.all() if user.is_admin == True][0]
            admin_wallet = Admin_wallet.objects.filter(user=admin_user).first()
            admin_wallet.amount = admin_wallet.amount + recharge_record.amount
            admin_wallet.save()

            # update user wallet
            user = recharge_record.user
            user.wallet = user.wallet + recharge_record.amount
            user.save() 

            return JsonResponse({"status": "Success", "message": "Recharge Approved"})
        return JsonResponse({"status": "Failed", "message": "Invalid Recharge Record"})
    return JsonResponse({"status": "Failed", "message": "Invalid Request"})

@csrf_exempt
def generate_income(request):
    if request.method == "POST":
        days_of_income_generation = "2"
        purchased_products = Orders.objects.all()
        for product in purchased_products:
            user_profile_object = product.user
            if(days_of_income_generation=="2"):
                if product.date_purchase + timezone.timedelta(days=product.product.days) < timezone.now():
                    user_profile_object.income += product.product.daily_income
                    user_profile_object.save()
                return JsonResponse({'status': 'Success', 'message': 'Income Generated'})
            return JsonResponse({'status': 'Error', 'message': 'User not found'})
        return JsonResponse({'status': 'Error', 'message': 'Phone Number not registered'})
    return JsonResponse({'status': 'Error', 'message': 'Bad Request'})