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
def add_agent(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone = data.get("phone_number")
        password = data.get("password")
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        user = User.objects.create(username=phone, first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save()
        agent = Profile.objects.create(user=user, phone_number=phone, is_agent=True)
        agent.save()
        return JsonResponse({"status": "Success", "message": "Agent Added Successfully"})
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
                order_details = []
                admin = Profile.objects.filter(is_admin=True).first()
                admin_wallet = Admin_wallet.objects.filter(user=admin).first()
                for order in Orders.objects.all():
                    order_details.append({
                        "id": order.uid,
                        "user": order.user.user.first_name,
                        "phone_number": order.user.phone_number,
                        "product": order.product.name,
                        "amount": order.amount,
                        "date_purchase": order.date_purchase.strftime("%B-%d-%Y") + " at " + order.date_purchase.strftime("%I:%M %p"),
                    })
                for record in recharge_records:
                    recharge_records_details.append({
                        "id": record.uid,
                        "user": record.user.user.first_name,
                        "amount": record.amount,
                        "status": record.status,
                        "date": record.date.strftime("%B-%d-%Y") + " at " + record.date.strftime("%I:%M %p"),
                        "phone_number": record.user.phone_number,
                        "is_rejected": record.is_rejected
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
                        "phone_number": record.user.phone_number,
                        "is_rejected": record.is_rejected
                    })
                for user in users:
                    users_details.append({
                        "id": user.uid,
                        "name": user.user.first_name,
                        "phone_number": user.phone_number,
                        "invite_code": user.invite_code,
                        "is_verified": user.is_verified,
                        "start_time": user.start_time,
                        "recommended_by": user.recommended_by.first_name if user.recommended_by else None,
                        "vip_level": user.vip_level,
                        "wallet": user.wallet,
                        "recharge_amount": user.recharge_amount,
                        "income": user.income,
                        "is_admin": user.is_admin,
                        "is_agent": user.is_agent
                    })
                for product in products:
                    products_details.append({
                        "id": product.uid,
                        "name": product.name,
                        "slug": product.slug,
                        "category": product.category.name,
                        "price": product.price,
                        "eligible_for_vip_number": product.eligible_for_vip_number,
                        # "image": product.image.url,
                        "days": product.days,
                        "daily_income": product.daily_income,
                        "total_income": product.total_income
                    })
                return JsonResponse({"status": "Success", "message": "logged in successfully and data is sent!", "recharge_records": recharge_records_details, "withdraw_records_details": withdraw_records_details, "users_details": users_details, "products_details": products_details, "order_details": order_details, "admin_wallet": admin_wallet.amount})
            return JsonResponse({"status": "Failed", "message": "You are not an admin"})
        return JsonResponse({"status": "Failed", "message": "Invalid Phone Number"})
    return JsonResponse({"status": "Failed", "message": "Invalid Request Method"})


@csrf_exempt
def show_overall_details(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        total_users = Profile.objects.all().count()
        total_recharge_records_today = 0
        total_recharge_records = Recharge_Record.objects.all()
        for record in total_recharge_records:
            if record.date.strftime("%B-%d-%Y") == timezone.now().strftime("%B-%d-%Y"):
                total_recharge_records_today += record.amount
        total_withdraw_records_today = 0
        total_withdraw_records = Withdraw_Record.objects.all()
        for record in total_withdraw_records:
            if record.date.strftime("%B-%d-%Y") == timezone.now().strftime("%B-%d-%Y"):
                total_withdraw_records_today += record.amount
        total_pending_withdraw_records = Withdraw_Record.objects.filter(status=False).count()
        total_pending_recharge_records = Recharge_Record.objects.filter(status=False).count()
        total_products = Product.objects.all().count()
        total_orders_today = Orders.objects.filter(date_purchase__date=timezone.now().date()).count()
        total_orders = Orders.objects.all().count()
        total_approved_withdraw_records = Withdraw_Record.objects.filter(status=True).count()
        total_approved_recharge_records = Recharge_Record.objects.filter(status=True).count()
        data = {
            "total_users": total_users,
            "total_recharge_records_today": total_recharge_records_today,
            "total_withdraw_records_today": total_withdraw_records_today,
            "total_pending_withdraw_records": total_pending_withdraw_records,
            "total_pending_recharge_records": total_pending_recharge_records,
            "total_products": total_products,
            "total_orders_today": total_orders_today,
            "total_orders": total_orders,
            "total_approved_withdraw_records": total_approved_withdraw_records,
            "total_approved_recharge_records": total_approved_recharge_records
        }
        return JsonResponse({"status": "Success", "message": "logged in successfully and data is sent!", 
                             "data":data})
    return JsonResponse({"status": "Failed", "message": "Invalid Request Method"})

@csrf_exempt
def show_withdrawl_requests(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone = data.get("phone_number")
        user = Profile.objects.filter(phone_number=phone).first()
        withdraw_records = Withdraw_Record.objects.filter(user=user).all()
        # withdraw_records = Withdraw_Record.objects.filter(username=phone).all()
        withdraw_records_details = []
        for record in withdraw_records:
            withdraw_records_details.append({
                "id": record.uid,
                "user": record.user.user.first_name,
                "phone": record.user.phone_number,
                "amount": record.amount,
                "status": record.status,
                "date": str(record.date.strftime("%B-%d-%Y")) + " at " + str(record.date.strftime("%I:%M %p")),
                "account_number": record.bank_card.account_number,
                "ifsc_code": record.bank_card.ifsc_code,
                "card_holder_name": record.bank_card.card_holder_name
            })
        return JsonResponse({"status": "Success","message":  "logged in successfully and data is sent!","data": withdraw_records_details})
    return JsonResponse({"status": "Failed", "message": "Invalid Request"})

@csrf_exempt
def show_recharge_requests(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone = data.get("phone_number")
        
        user = Profile.objects.filter(phone_number=phone).first()
        recharge_records = Recharge_Record.objects.filter(user=user).all()
        # recharge_records = Recharge_Record.objects.all()
        recharge_records_details = []
        for record in recharge_records:
            recharge_records_details.append({
                "id": record.uid,
                "user": record.user.user.first_name,
                "phone": record.user.phone_number,
                "amount": record.amount,
                "status": record.status,
                "date": str(record.date.strftime("%B-%d-%Y")) + " at " + str(record.date.strftime("%I:%M %p")),
            })
        return JsonResponse({"status": "Success", "messsage":"logged in successfully and data is sent!","data": recharge_records_details})
    return JsonResponse({"status": "Failed", "message": "Invalid Request"})

@csrf_exempt
def show_users(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone = data.get("phone_number")
        users = Profile.objects.filter(username=phone).all()
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
def approve_withdraw_records(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        uid = data.get("withdrawal_id")
        is_rejected = data.get("is_rejected")
        if(is_rejected==True):
            withdraw_record = Withdraw_Record.objects.filter(uid=uid).first()
            if withdraw_record:
                withdraw_record.is_rejected = True
                withdraw_record.save()
                return JsonResponse({"status": "Success", "message": "Withdraw Rejected"})
            return JsonResponse({"status": "Failed", "message": "Invalid Withdraw Record"})
        admin_user = [user for user in Profile.objects.all() if user.is_admin == True][0]
        admin_wallet = Admin_wallet.objects.filter(user=admin_user).first()
        withdraw_record = Withdraw_Record.objects.filter(uid=uid).first()
        if withdraw_record:
            if withdraw_record.amount < admin_wallet.amount:
                withdraw_record.status = True
                withdraw_record.save()
                # subtract the amount from admin wallet
                admin_wallet.amount = admin_wallet.amount - withdraw_record.amount
                admin_wallet.save()
                # subtract the amount from user wallet
                user = withdraw_record.user
                user.wallet = user.wallet - withdraw_record.amount
                user.save()
                return JsonResponse({"status": "Success", "message": "Withdraw Approved"})
            return JsonResponse({"status": "Failed", "message": "Insufficient Balance"})
        return JsonResponse({"status": "Failed", "message": "Invalid Withdraw Record"})
    return JsonResponse({"status": "Failed", "message": "Invalid Request"})

@csrf_exempt
def approve_recharge_record(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        uid = data.get("recharge_id")
        is_rejected = data.get("is_rejected")
        if(is_rejected==True): 
            recharge_record = Recharge_Record.objects.filter(uid=uid).first()
            if recharge_record:
                recharge_record.is_rejected = True
                recharge_record.save()
                return JsonResponse({"status": "Success", "message": "Recharge Rejected"})
            return JsonResponse({"status": "Failed", "message": "Invalid Recharge Record"})
        recharge_record = Recharge_Record.objects.filter(uid=uid).first()
        if recharge_record:
            recharge_record.status = True
            recharge_record.save()
            
            #update admin wallet
            admin_user = [user for user in Profile.objects.all() if user.is_admin == True][0]
            admin_wallet = Admin_wallet.objects.filter(user=admin_user).first()
            admin_wallet.amount = admin_wallet.amount + recharge_record.amount
            admin_wallet.save()

            # update Recommend User Wallet by 25% of recharge amount if its first recharge
            if recharge_record.user.recharge_amount == 0:
                recommend_user = recharge_record.user.recommended_by
                if recommend_user:
                    recommend_user.wallet = recommend_user.wallet + (recharge_record.amount * 0.25)
                    recommend_user.save()
                    income_object = Income.objects.create(user=recommend_user.user, amount=recharge_record.amount * 0.25, income_type="Referral Rehcharge Income", income_date=timezone.now())
                    income_object.save()

            # update user wallet
            user = recharge_record.user
            user.recharge_amount = user.recharge_amount + recharge_record.amount
            user.wallet = user.wallet + recharge_record.amount
            user.save() 

            return JsonResponse({"status": "Success", "message": "Recharge Approved"})
        return JsonResponse({"status": "Failed", "message": "Invalid Recharge Record"})
    return JsonResponse({"status": "Failed", "message": "Invalid Request"})

@csrf_exempt
def generate_income(request):
    if request.method == "POST":
        # Check if no income is generated today then only generate the income 
        income = Income.objects.filter(income_date__date=timezone.now().date()).first()
        if not income:
            purchased_products = Orders.objects.all()
            for product in purchased_products:
                user_profile_object = product.user
                print(product.date_purchase + timezone.timedelta(days=product.product.days))
                print(product.date_purchase) 
                print(timezone.timedelta(days=product.product.days))
                print(timezone.now())
                if product.date_purchase + timezone.timedelta(days=product.product.days) > timezone.now():
                    print("here")
                    if product.product.category.name == "exclusive":
                        # Add Daily Income to wallet
                        user_profile_object.wallet = user_profile_object.wallet + product.product.daily_income
                        user_profile_object.save()
                        income_object = Income.objects.create(user=user_profile_object.user, amount=product.product.daily_income, income_type="Exclusive Product", income_date=timezone.now())
                        income_object.save()
                    elif product.product.category.name == "upgrade":
                        # Add Daily Income to wallet
                        user_profile_object.wallet = user_profile_object.wallet + product.product.daily_income
                        user_profile_object.save()
                        income_object = Income.objects.create(user=user_profile_object.user, amount=product.product.daily_income, income_type="Upgrade Product", income_date=timezone.now())
                        income_object.save()
                    elif product.product.category.name == "gift":
                        # Add Daily Income to wallet
                        user_profile_object.wallet = user_profile_object.wallet + product.product.daily_income
                        user_profile_object.save()
                        income_object = Income.objects.create(user=user_profile_object.user, amount=product.product.daily_income, income_type="Gift Product", income_date=timezone.now())
                        income_object.save()
                return JsonResponse({'status': 'Success', 'message': 'Income Generated successfully'})
        return JsonResponse({'status': 'Error', 'message': 'No Orders Yet to Generate Income Or Income Already Generated Today'})
    return JsonResponse({'status': 'Error', 'message': 'Bad Request'})

@csrf_exempt
def modfify_user_wallet(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone = data.get("phone_number")
        amount = data.get("amount")
        user = Profile.objects.filter(phone_number=phone).first()
        user.wallet = amount
        user.save()
        return JsonResponse({"status": "Success", "message": "Wallet Updated Successfully"})
    return JsonResponse({"status": "Failed", "message": "Invalid Request"})

@csrf_exempt
def add_money_to_userwallet(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone = data.get("phone_number")
        amount = data.get("amount")
        user = Profile.objects.filter(phone_number=phone).first()
        user.wallet = user.wallet + amount
        user.save()
        return JsonResponse({"status": "Success", "message": "Wallet Updated Successfully"})
    return JsonResponse({"status": "Failed", "message": "Invalid Request"})