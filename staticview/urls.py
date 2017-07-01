from django.conf.urls import url
from staticview import views

urlpatterns = [
    url(r'^about/$', views.about, name='about'),
    url(r'^contact/$', views.contact, name='contact'),
]