from django.shortcuts import render
from .models import *
from accounts.models import *
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def all_proucts(request):
    upgrage_product = Product.objects.filter(category__name='upgrade').all()
    exclusive_product = Product.objects.filter(category__name='exclusive').all()
    gift_products = Product.objects.filter(category__name='gift').all()
    upgrade_product_details = []
    exclusive_product_details = []
    gift_product_details = []
    for prod in upgrage_product:
        # print(prod.image.url)
        upgrade_product_details.append({
            'id': prod.uid,
            'name': prod.name,
            'slug': prod.slug,
            'price': prod.price,
            'eligible_for_vip_number': prod.eligible_for_vip_number,
            'image': "/media/products/copeer.jpg",
            'days': prod.days,
            'daily_income': prod.daily_income,
            'total_income': prod.total_income
        })
    for prod in exclusive_product:
        exclusive_product_details.append({
            'id': prod.uid,
            'name': prod.name,
            'slug': prod.slug,
            'price': prod.price,
            'eligible_for_vip_number': prod.eligible_for_vip_number,
            'image': "/media/products/copeer.jpg",
            'days': prod.days,
            'daily_income': prod.daily_income,
            'total_income': prod.total_income
        })
    for prod in gift_products:
        gift_product_details.append({
            'id': prod.uid,
            'name': prod.name,
            'slug': prod.slug,
            'price': prod.price,
            'eligible_for_vip_number': prod.eligible_for_vip_number,
            'image': "/media/products/copeer.jpg",
            'days': prod.days,
            'daily_income': prod.daily_income,
            'total_income': prod.total_income
        })
    return JsonResponse({'status': 'Success', 'upgrade_product_details': upgrade_product_details, 'exclusive_product_details': exclusive_product_details, 'gift_product_details': gift_product_details})


@csrf_exempt
def purchase_product(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone = data.get('phone_number')
        user = Profile.objects.filter(phone_number=phone).first()
        product_id = data.get('product_id')
        product = Product.objects.filter(uid=product_id).first()
        user_wallet = user.wallet
        product_price = product.price
        if user_wallet < product_price:
            return JsonResponse({'status': 'Error', 'message': 'Insufficient balance'})
        user_vip_level = user.vip_level
        if (product.category.name == 'gift' or product.category.name == 'exclusive') and user_vip_level < product.eligible_for_vip_number:
            return JsonResponse({'status': 'Error', 'message': 'You are not eligible for this product'})
        user.wallet = user_wallet - product_price
        if product.category.name == 'upgrade':
            user.vip_level = user.vip_level + 1
            user.save()
        user.save()
        order = Orders.objects.create(user=user, product=product, amount=product_price)
        order.save()
        order.set_date_purchase()
        return JsonResponse({'status': 'Success', 'message': 'Product purchased successfully'})
    return JsonResponse({'status': 'Error', 'message': 'Something went wrong'})

@csrf_exempt
def income_details(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone = data.get('phone_number')
        user = Profile.objects.filter(phone_number=phone).first()
        if user:
            income = Income.objects.filter(user=user.user).all()
            income_details = []
            for inc in income:
                income_details.append({
                    'id': inc.uid,
                    'amount': inc.amount,
                    'income_type': inc.income_type,
                    'income_date': inc.income_date.strftime("%d-%m-%Y")
                })
            return JsonResponse({'status': 'Success', 'income_details': income_details})
        return JsonResponse({'status': 'Error', 'message': 'User not found'})
    return JsonResponse({'status': 'Error', 'message': 'Something went wrong'})

@csrf_exempt
def exec_task(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone = data.get('phone_number')
        task_id = data.get('task_id')
        user = Profile.objects.filter(phone_number=phone).first()
        task = Tasks.objects.filter(uid=task_id).first()
        if task:
            task_partial_slug = task.task_name.lower().split(" ")
            task_slug = "".join(task_partial_slug)
            if task_slug == 'active10':
                # filter the users in the Level 1 to check if they have 10 users in their downline who have vip level 1
                downline_users = Profile.objects.filter(recommended_by=user, vip_level=1).all()
                if len(downline_users) < 10:
                    # check in level 2 and level 3 if they have vip level 1 users in their downline then add them to the downline_users list
                    for downline_user in downline_users:
                        downline_user_level_1 = Profile.objects.filter(recommended_by=downline_user, vip_level=1).all()
                        if len(downline_user_level_1) > 0:
                            downline_users = downline_users + downline_user_level_1
                    if len(downline_users) < 10:
                        return JsonResponse({'status': 'unactivate', 'message': 'You do not have 10 users in your downline who have vip level 1'})
                # updat the income of the user who has activated the 10 users in his downline who have vip level 1 with 47 rupees
                user.wallet = user.wallet + 47
                # create an income object for the user who has activated the 10 users in his downline who have vip level 1
                income = Income.objects.create(user=user.user, amount=47, income_type='After 10 Completed', income_date=timezone.now())
                income.save()
                # update admin wallet with 47 rupees
                admin = Profile.objects.filter(is_admin=True).first()
                if admin:
                    if (admin.wallet - 47) > 0:
                        admin.wallet = admin.wallet - 47
                        admin.save()
                    else:
                        return JsonResponse({'status': 'Error', 'message': 'Some Issue might have occured, please try again later'})
                else:
                    return JsonResponse({'status': 'Error', 'message': 'Admin not found'})
                # update the task status in task model
                task.status = True
                task.save()
                return JsonResponse({'status': 'Success', 'message': 'Task completed successfully'})
            elif task_slug == 'active30':
                # filter the users in the Level 1 to check if they have 30 users in their downline who have vip level 1
                downline_users = Profile.objects.filter(recommended_by=user, vip_level=1).all()
                if len(downline_users) < 30:
                    # check in level 2 and level 3 if they have vip level 1 users in their downline then add them to the downline_users list
                    for downline_user in downline_users:
                        downline_user_level_1 = Profile.objects.filter(recommended_by=downline_user, vip_level=1).all()
                        if len(downline_user_level_1) > 0:
                            downline_users = downline_users + downline_user_level_1
                    if len(downline_users) < 30:
                        return JsonResponse({'status': 'unactivate', 'message': 'You do not have 30 users in your downline who have vip level 1'})
                # updat the income of the user who has activated the 30 users in his downline who have vip level 1 with 147 rupees
                user.wallet = user.wallet + 147
                # create an income object for the user who has activated the 30 users in his downline who have vip level 1
                income = Income.objects.create(user=user.user, amount=147, income_type='After 30 Completed', income_date=timezone.now())
                income.save()
                # update admin wallet with 147 rupees
                admin = Profile.objects.filter(is_admin=True).first()
                if admin:
                    if (admin.wallet - 147) > 0:
                        admin.wallet = admin.wallet - 147
                        admin.save()
                    else:
                        return JsonResponse({'status': 'Error', 'message': 'Some Issue might have occured, please try again later'})
                else:
                    return JsonResponse({'status': 'Error', 'message': 'Admin not found'})
                # update the task status in task model
                task.status = True
                task.save()
                return JsonResponse({'status': 'Success', 'message': 'Task completed successfully'})
            elif task_slug == 'active50':
                # filter the users in the Level 1 to check if they have 50 users in their downline who have vip level 1
                downline_users = Profile.objects.filter(recommended_by=user, vip_level=1).all()
                if len(downline_users) < 50:
                    # check in level 2 and level 3 if they have vip level 1 users in their downline then add them to the downline_users list
                    for downline_user in downline_users:
                        downline_user_level_1 = Profile.objects.filter(recommended_by=downline_user, vip_level=1).all()
                        if len(downline_user_level_1) > 0:
                            downline_users = downline_users + downline_user_level_1
                    if len(downline_users) < 50:
                        return JsonResponse({'status': 'unactivate', 'message': 'You do not have 50 users in your downline who have vip level 1'})
                # updat the income of the user who has activated the 50 users in his downline who have vip level 1 with 247 rupees
                user.wallet = user.wallet + 247
                # create an income object for the user who has activated the 50 users in his downline who have vip level 1
                income = Income.objects.create(user=user.user, amount=247, income_type='After 50 Completed', income_date=timezone.now())
                income.save()
                # update admin wallet with 247 rupees
                admin = Profile.objects.filter(is_admin=True).first()
                if admin:
                    if (admin.wallet - 247) > 0:
                        admin.wallet = admin.wallet - 247
                        admin.save()
                    else:
                        return JsonResponse({'status': 'Error', 'message': 'Some Issue might have occured, please try again later'})
                else:
                    return JsonResponse({'status': 'Error', 'message': 'Admin not found'})
                # update the task status in task model
                task.status = True
                task.save()
                return JsonResponse({'status': 'Success', 'message': 'Task completed successfully'})
            elif task_slug == 'active100':
                # filter the users in the Level 1 to check if they have 100 users in their downline who have vip level 1
                downline_users = Profile.objects.filter(recommended_by=user, vip_level=1).all()
                if len(downline_users) < 100:
                    # check in level 2 and level 3 if they have vip level 1 users in their downline then add them to the downline_users list
                    for downline_user in downline_users:
                        downline_user_level_1 = Profile.objects.filter(recommended_by=downline_user, vip_level=1).all()
                        if len(downline_user_level_1) > 0:
                            downline_users = downline_users + downline_user_level_1
                    if len(downline_users) < 100:
                        return JsonResponse({'status': 'unactivate', 'message': 'You do not have 100 users in your downline who have vip level 1'})
                # updat the income of the user who has activated the 100 users in his downline who have vip level 1 with 547 rupees
                user.wallet = user.wallet + 547
                # create an income object for the user who has activated the 100 users in his downline who have vip level 1
                income = Income.objects.create(user=user.user, amount=547, income_type='After 100 Completed', income_date=timezone.now())
                income.save()
                # update admin wallet with 547 rupees
                admin = Profile.objects.filter(is_admin=True).first()
                if admin:
                    if (admin.wallet - 547) > 0:
                        admin.wallet = admin.wallet - 547
                        admin.save()
                    else:
                        return JsonResponse({'status': 'Error', 'message': 'Some Issue might have occured, please try again later'})
                else:
                    return JsonResponse({'status': 'Error', 'message': 'Admin not found'})
                # update the task status in task model
                task.status = True
                task.save()
                return JsonResponse({'status': 'Success', 'message': 'Task completed successfully'})
            elif task_slug == 'active1000':
                # filter the users in the Level 1 to check if they have 1000 users in their downline who have vip level 1
                downline_users = Profile.objects.filter(recommended_by=user, vip_level=1).all()
                if len(downline_users) < 1000:
                    # check in level 2 and level 3 if they have vip level 1 users in their downline then add them to the downline_users list
                    for downline_user in downline_users:
                        downline_user_level_1 = Profile.objects.filter(recommended_by=downline_user, vip_level=1).all()
                        if len(downline_user_level_1) > 0:
                            downline_users = downline_users + downline_user_level_1
                    if len(downline_users) < 1000:
                        return JsonResponse({'status': 'unactivate', 'message': 'You do not have 1000 users in your downline who have vip level 1'})
                # updat the income of the user who has activated the 1000 users in his downline who have vip level 1 with 547 rupees
                user.wallet = user.wallet + 547
                # create an income object for the user who has activated the 1000 users in his downline who have vip level 1
                income = Income.objects.create(user=user.user, amount=547, income_type='After 1000 Completed', income_date=timezone.now())
                income.save()
                # update admin wallet with 547 rupees
                admin = Profile.objects.filter(is_admin=True).first()
                if admin:
                    if (admin.wallet - 547) > 0:
                        admin.wallet = admin.wallet - 547
                        admin.save()
                    else:
                        return JsonResponse({'status': 'Error', 'message': 'Some Issue might have occured, please try again later'})
                else:
                    return JsonResponse({'status': 'Error', 'message': 'Admin not found'})
                # update the task status in task model
                task.status = True
                task.save()
                return JsonResponse({'status': 'Success', 'message': 'Task completed successfully'})
            else:
                return JsonResponse({'status': 'Error', 'message': 'Task not found'})
        else:
            return JsonResponse({'status': 'Error', 'message': 'Task not found'})
    return JsonResponse({'status': 'Error', 'message': 'Something went wrong'})

@csrf_exempt
def task_status(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        phone = data.get('phone_number')
        user = Profile.objects.filter(phone_number=phone).first()
        if user:
            tasks = Tasks.objects.all()
            task_details = []
            for task in tasks:
                task_details.append({
                    'id': task.uid,
                    'task_name': task.task_name,
                    'task_description': task.task_description,
                    'status': task.status,
                    'no_of_users': calculateUsers(user, task.task_name)
                })
            return JsonResponse({'status': 'Success', 'task_details': task_details})
        return JsonResponse({'status': 'Error', 'message': 'User not found'})
    return JsonResponse({'status': 'Error', 'message': 'Something went wrong'})

def calculateUsers(user, task_name):
    task_partial_slug = task_name.lower().split(" ")
    task_slug = "".join(task_partial_slug)
    if task_slug == 'active10':
        # filter the users in the Level 1 to check if they have 10 users in their downline who have vip level 1
        downline_users = Profile.objects.filter(recommended_by=user, vip_level=1).all()
        if len(downline_users) < 10:
            # check in level 2 and level 3 if they have vip level 1 users in their downline then add them to the downline_users list
            for downline_user in downline_users:
                downline_user_level_1 = Profile.objects.filter(recommended_by=downline_user, vip_level=1).all()
                if len(downline_user_level_1) > 0:
                    downline_users = downline_users + downline_user_level_1
            return len(downline_users)
        return len(downline_users)
    elif task_slug == 'active30':
        # filter the users in the Level 1 to check if they have 30 users in their downline who have vip level 1
        downline_users = Profile.objects.filter(recommended_by=user, vip_level=1).all()
        if len(downline_users) < 30:
            # check in level 2 and level 3 if they have vip level 1 users in their downline then add them to the downline_users list
            for downline_user in downline_users:
                downline_user_level_1 = Profile.objects.filter(recommended_by=downline_user, vip_level=1).all()
                if len(downline_user_level_1) > 0:
                    downline_users = downline_users + downline_user_level_1
            return len(downline_users)
        return len(downline_users)
    elif task_slug == 'active50':
        # filter the users in the Level 1 to check if they have 50 users in their downline who have vip level 1
        downline_users = Profile.objects.filter(recommended_by=user, vip_level=1).all()
        if len(downline_users) < 50:
            # check in level 2 and level 3 if they have vip level 1 users in their downline then add them to the downline_users list
            for downline_user in downline_users:
                downline_user_level_1 = Profile.objects.filter(recommended_by=downline_user, vip_level=1).all()
                if len(downline_user_level_1) > 0:
                    downline_users = downline_users + downline_user_level_1
            return len(downline_users)
        return len(downline_users)
    elif task_slug == 'active100':
        # filter the users in the Level 1 to check if they have 100 users in their downline who have vip level 1
        downline_users = Profile.objects.filter(recommended_by=user, vip_level=1).all()
        if len(downline_users) < 100:
            # check in level 2 and level 3 if they have vip level 1 users in their downline then add them to the downline_users list
            for downline_user in downline_users:
                downline_user_level_1 = Profile.objects.filter(recommended_by=downline_user, vip_level=1).all()
                if len(downline_user_level_1) > 0:
                    downline_users = downline_users + downline_user_level_1
            return len(downline_users)
        return len(downline_users)
    elif task_slug == 'active1000':
        # filter the users in the Level 1 to check if they have 1000 users in their downline who have vip level 1
        downline_users = Profile.objects.filter(recommended_by=user, vip_level=1).all()
        if len(downline_users) < 1000:
            # check in level 2 and level 3 if they have vip level 1 users in their downline then add them to the downline_users list
            for downline_user in downline_users:
                downline_user_level_1 = Profile.objects.filter(recommended_by=downline_user, vip_level=1).all()
                if len(downline_user_level_1) > 0:
                    downline_users = downline_users + downline_user_level_1
            return len(downline_users)
        return len(downline_users)
    else:
        return 0