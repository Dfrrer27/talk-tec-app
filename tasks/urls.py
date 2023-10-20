from django.urls import path
from .views import *

urlpatterns = [
    path('register', RegistrarView.as_view()),
    path('me', RecuperarUsuarioView.as_view())
]

