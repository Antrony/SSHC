from django.conf.urls import url, include
from entry import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'zones', views.ZoneViewSet)


urlpatterns = [
    url(r'^$', views.intro, name='intro'),
    url(r'^data/$', views.zones, name='data'),

    url(r'^data/getzone/$', views.getZone, name='getzone'),
    url(r'^data/addzone/$', views.addZone, name='addzone'),
    url(r'^data/editzone/$', views.editZone, name='editzone'),
    url(r'^data/getzonebid/$',views.getZonebaseID,name='getzonebid'),
    url(r'^data/delzone/$',views.delZone,name='delzone'),

    url(r'^data/getschool/$', views.getSchool, name='getschool'),
    url(r'^data/addschool/$', views.addSchool, name='addschool'),
    url(r'^data/editschool/$', views.editSchool, name='editschool'),
    url(r'^data/getschbid/$',views.getSchbaseID,name='getschbid'),
    url(r'^data/delschool/$',views.delSchool,name='delschool'),
    url(r'^data/getschbzid/$',views.getSchoolbasezid,name='getschbzid'),

    url(r'^data/getstudent/$', views.getStudent, name='getstudent'),
    url(r'^data/addstudent/$', views.addStudent, name='addstudent'),
    url(r'^data/editstudent/$', views.editStudent, name='editstudent'),
    url(r'^data/getstubid/$', views.getStubaseID, name='getstubid'),
    url(r'^data/delstudent/$', views.delStudent, name='delstudent'),

    url(r'^api/', include(router.urls)),
    url(r'^api/api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
