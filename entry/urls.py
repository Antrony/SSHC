from django.conf.urls import url
from entry import views

urlpatterns = [
    url(r'^data/$', views.zones, name='data'),

    url(r'^data/getzone/$', views.getZone, name='getzone'),

    url(r'^data/getschool/$', views.getSchool, name='getschool'),
    url(r'^data/addschool/$', views.addSchool, name='addschool'),
    url(r'^data/editschool/$', views.editSchool, name='editschool'),
    url(r'^data/getschbid/$',views.getSchbaseID,name='getschbid'),
    url(r'^data/delschool/$',views.delSchool,name='delschool'),

    url(r'^data/getstudent/$', views.getStudent, name='getstudent'),
]
