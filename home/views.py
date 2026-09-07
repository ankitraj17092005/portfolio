from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

# from allauth.socialaccount.models import SocialAccount

# social_account = SocialAccount.objects.get(
#     user=request.user
# )

# print(social_account.provider)
# print(social_account.extra_data)

def index(request):
    return render(request,"home/index.html")