from django.db import models

class zone(models.Model):
    name = models.TextField(null=True,default='null')
    city = models.TextField(null=True, default='null')
    date = models.DateTimeField(auto_now=True, blank=True)

class school(models.Model):
    name = models.TextField(null=True,default='null')
    address = models.TextField(null=True, default='null')
    level = models.TextField(null=True, default='null')
    code = models.TextField(null=True, default='null')
    zone_id = models.IntegerField()
    date = models.DateTimeField(auto_now=True, blank=True)

class student(models.Model):
    name = models.TextField(null=True,default='null')
    stu_id = models.TextField(null=True, default='null')
    standard = models.TextField(null=True, default='null')
    dob = models.TextField(null=True, default='null')
    gender = models.TextField(null=True, default='null')
    address = models.TextField(null=True, default='null')
    emergency_contact = models.TextField(null=True, default='null')
    school_id = models.IntegerField()
    date = models.DateTimeField(auto_now=True, blank=True)