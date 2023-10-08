from django.shortcuts import render
from .models import *
from django.http import JsonResponse
import json

# Create your views here.

def all_proucts(request):
    upgrage_product = Product.objects.filter(category__name='upgrade').all()
    exclusive_product = Product.objects.filter(category__name='exclusive').all()
    gift_products = Product.objects.filter(category__name='gift').all()
    upgrade_product_details = []
    exclusive_product_details = []
    gift_product_details = []
    for prod in upgrage_product:
        upgrade_product_details.append({
            'id': prod.uid,
            'name': prod.name,
            'slug': prod.slug,
            'price': prod.price,
            'eligible_for_vip_number': prod.eligible_for_vip_number,
            'image': prod.image.url,
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
            'image': prod.image.url,
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
            'image': prod.image.url,
            'days': prod.days,
            'daily_income': prod.daily_income,
            'total_income': prod.total_income
        })
    return JsonResponse({'status': 'Success', 'upgrade_product_details': upgrade_product_details, 'exclusive_product_details': exclusive_product_details, 'gift_product_details': gift_product_details})

def purchase_product(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        user = Profile.objects.all().first()
        product_id = data.get('product_id')
        product = Product.objects.filter(uid=product_id).first()
        if product.category.name == 'upgrade':
            user.vip_level = user.vip_level + 1
            user.save()
        return JsonResponse({'status': 'Success', 'message': 'Product purchased successfully'})
    return JsonResponse({'status': 'Error', 'message': 'Something went wrong'})