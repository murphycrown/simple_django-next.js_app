from django.urls import path
from .views import GenerateCard, SaveCard

urlpatterns = [
    
    path('generate-card/', GenerateCard.as_view(), name='generate-card'),
    path('save-card/', SaveCard.as_view(), name='save-card'),
]