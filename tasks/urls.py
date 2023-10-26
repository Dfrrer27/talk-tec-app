from django.urls import path
from .views import *

urlpatterns = [
    path('register', RegistrarView.as_view()),
    path('me', RecuperarUsuarioView.as_view()),
    path('carreras-tecnologicas/', CarrerasTecnologicasView.as_view(), name='carreras-tecnologicas')
]