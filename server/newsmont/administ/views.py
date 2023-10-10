from django.shortcuts import render
import json
from accounts.models import *
from dashboard.models import *
from administ.models import * 
from django.http import JsonResponse

# Create your views here.

def admin_index(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone = data.get("phone_number")
        password = data.get("password")
        admin = Profile.objects.filter(phone_number=phone).first()
        if admin:
            if admin.is_admin:
                if admin.user.check_password(password):
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
                            "amount_left": record.amount_left
                        })
                    for record in withdraw_records:
                        withdraw_records_details.append({
                            "id": record.uid,
                            "user": record.user.user.first_name,
                            "amount": record.amount,
                            "status": record.status,
                            "date": record.date,
                            "bank_card": record.bank_card.card_number
                        })
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
                    return JsonResponse({"status": "Success", "logged in successfully and data is sent!": recharge_records_details, "withdraw_records_details": withdraw_records_details, "users_details": users_details, "products_details": products_details})
                return JsonResponse({"status": "Failed", "message": "Invalid Password"})
            return JsonResponse({"status": "Failed", "message": "You are not an admin"})
        return JsonResponse({"status": "Failed", "message": "Invalid Phone Number"})
    return JsonResponse({"status": "Failed", "message": "Invalid Request Method"})
    

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
                "date": record.date.strftime("%B-%d-%Y"),
                "account_number": record.bank_card.account_number,
                "ifsc_code": record.bank_card.ifsc_code,
                "card_holder_name": record.bank_card.card_holder_name
            })
        return JsonResponse({"status": "Success", "logged in successfully and data is sent!": withdraw_records_details})
    return JsonResponse({"status": "Failed", "message": "Invalid Request"})


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
