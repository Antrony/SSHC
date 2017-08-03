import json

from django.core import serializers
from django.http import HttpResponse
from django.shortcuts import render

from entry.models import school,zone,student
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from entry.serializers import  UserSerializer, GroupSerializer

def zones(request):
    return render(request, 'entry/data.html')

def getZone(request):
    if request.method == 'GET':
        zone_data = zone.objects.all().order_by('-id')
        zones = serializers.serialize('json', zone_data)
        return HttpResponse(zones, content_type='application/json')
    else:
        return HttpResponse('Invalid Method')

def addZone(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        name = data.get('name')
        city = data.get('city')
        addzone = zone(name=name, city=city)
        addzone.save()
        if addzone:
            return HttpResponse("Success")
        else:
            return HttpResponse("Failed")
    else:
        return HttpResponse('Invalid Method')

def editZone(request):
    if request.method == 'POST':
        edata = json.loads(request.body.decode('utf-8'))
        z_id = int(edata.get('eid'))
        data = edata.get('editzone')
        ed_name = data.get('name')
        ed_city = data.get('city')
        edZone = zone.objects.filter(id=z_id).update(name=ed_name, city=ed_city)
        if edZone:
            return HttpResponse('Success')
        else:
            return HttpResponse('Failed')
    else:
        return HttpResponse('Invalid Method')

def getZonebaseID(request):
    if request.method == 'GET':
        z_id = request.GET.get('id')
        zo = zone.objects.filter(id=z_id)
        zonedata = serializers.serialize('json', zo)
        return HttpResponse(zonedata, content_type='application/json')
    else:
        return HttpResponse('Invalid Method')


def delZone(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        ids = json.loads(data.get('id'))
        for id in ids:
            delzone = zone.objects.filter(id=id).delete()
        if delzone:
            return HttpResponse('Success')
        else:
            return HttpResponse('Failed')
    else:
        return HttpResponse('Invalid Method')

def getSchool(request):
    if request.method == 'GET':
        sch_data = school.objects.all().order_by('-id')
        schools = serializers.serialize('json',sch_data)
        return HttpResponse(schools, content_type='application/json')

def addSchool(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        name = data.get('schname')
        addr = data.get('schaddr')
        level = data.get('schlevel')
        code = data.get('schcode')
        zid = data.get('zone')
        addSchool = school(name=name, address=addr, level=level, code=code, zone_id=zid)
        addSchool.save()
        if addSchool:
            return HttpResponse("Success")
        else:
            return HttpResponse("Failed")
    else:
        return HttpResponse('Invalid Method')

def editSchool(request):
    if request.method == 'POST':
        edata = json.loads(request.body.decode('utf-8'))
        sch_id = int(edata.get('eid'))
        data = edata.get('editsch')
        ed_name = data.get('name')
        ed_addr = data.get('address')
        ed_level = data.get('level')
        ed_code = data.get('code')
        ed_zid = data.get('zone_id')
        edSchool = school.objects.filter(id=sch_id).update(name=ed_name, address=ed_addr, level=ed_level, code=ed_code, zone_id=ed_zid)
        if edSchool:
            return HttpResponse('Success')
        else:
            return HttpResponse('Failed')
    else:
        return HttpResponse('Invalid Method')

def getSchbaseID(request):
    if request.method == 'GET':
        s_id=request.GET.get('id')
        sch = school.objects.filter(id=s_id)
        schdata = serializers.serialize('json', sch)
        return HttpResponse(schdata, content_type='application/json')
    else:
        return HttpResponse('Invalid Method')

def delSchool(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        ids = json.loads(data.get('id'))
        for id in ids:
            delser = school.objects.filter(id=id).delete()
        if delser:
            return HttpResponse('Success')
        else:
            return HttpResponse('Failed')
    else:
        return HttpResponse('Invalid Method')

def getStudent(request):
    if request.method == 'GET':
        stu_data = student.objects.all().order_by('-id')
        stu = serializers.serialize('json', stu_data)
        return HttpResponse(stu, content_type='application/json')
    else:
        return HttpResponse('Invalid Method')

def addStudent(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        name = data.get('name')
        stu_id = data.get('city')
        standard = data.get('city')
        dob = data.get('city')
        gender = data.get('city')
        address = data.get('city')
        emergency_contact = data.get('city')
        school_id = data.get('city')
        addstu = student(name=name, stu_id=stu_id, standard=standard,dob=dob,gender=gender,address=address,emergency_contact=emergency_contact,school_id=school_id)
        addstu.save()
        if addstu:
            return HttpResponse("Success")
        else:
            return HttpResponse("Failed")
    else:
        return HttpResponse('Invalid Method')

def editStudent(request):
    if request.method == 'POST':
        edata = json.loads(request.body.decode('utf-8'))
        z_id = int(edata.get('eid'))
        data = edata.get('editzone')
        ed_name = data.get('name')
        ed_city = data.get('city')
        edStu = student.objects.filter(id=z_id).update(name=ed_name, city=ed_city)
        if edStu:
            return HttpResponse('Success')
        else:
            return HttpResponse('Failed')
    else:
        return HttpResponse('Invalid Method')

def getStubaseID(request):
    if request.method == 'GET':
        stu_id = request.GET.get('id')
        stu = student.objects.filter(id=stu_id)
        studata = serializers.serialize('json', stu)
        return HttpResponse(studata, content_type='application/json')
    else:
        return HttpResponse('Invalid Method')


def delStudent(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        ids = json.loads(data.get('id'))
        for id in ids:
            delstu = student.objects.filter(id=id).delete()
        if delstu:
            return HttpResponse('Success')
        else:
            return HttpResponse('Failed')
    else:
        return HttpResponse('Invalid Method')

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer