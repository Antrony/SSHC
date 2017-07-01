from django.shortcuts import render
from entry.models import school,zone,student
from datetime import datetime
import json
from django.core import serializers
from django.http import HttpResponse

def zones(request):
    return render(request, 'entry/data.html')

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

def getZone(request):
    if request.method == 'GET':
        zone_data = zone.objects.all().order_by('-id')
        zones = serializers.serialize('json',zone_data)
        return HttpResponse(zones, content_type='application/json')
    else:
        return HttpResponse('Invalid Method')

def getStudent(request):
    if request.method == 'GET':
        stu_data = student.objects.all().order_by('-id')
        stu = serializers.serialize('json', stu_data)
        return HttpResponse(stu, content_type='application/json')
    else:
        return HttpResponse('Invalid Method')

def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""
    if isinstance(obj, datetime):
        serial = obj.isoformat()
        return serial
    raise TypeError("Type not serializable")
