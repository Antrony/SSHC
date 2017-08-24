from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static

from . import views as local_views
from rest_framework.authtoken import views as rest_framework_views

urlpatterns = [
    url(r'^login/$', local_views.login_user, name='login'),
    url(r'^logout/$', local_views.logout_user, name='logout'),
    url(r'^api/auth/$', rest_framework_views.obtain_auth_token, name='get_auth_token'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
