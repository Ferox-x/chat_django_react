from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.views import LoginView, LogoutView
from django.urls import reverse_lazy


class UserLoginView(LoginView):
    """Представление входа."""

    redirect_authenticated_user = True
    form_class = AuthenticationForm
    success_url = reverse_lazy('chat-urls:chat')
    template_name = 'auth/login.html'


class UserLogout(LogoutView):
    template_name = 'auth/logout.html'
