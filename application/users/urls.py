from django.urls import path

from users.views import UserLoginView, UserLogout

app_name = 'users'

urlpatterns = [
    path('login', UserLoginView.as_view(), name='login'),
    path('logout', UserLogout.as_view(), name='logout'),
]
