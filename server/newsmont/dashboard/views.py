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

