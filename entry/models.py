from django.db import models

class zone(models.Model):
    name = models.TextField(null=True,default='null')
    city = models.TextField(null=True,default='null')
    date = models.DateTimeField(auto_now=True, blank=True)

    def natural_key(self):
        return (self.name)

class school(models.Model):
    name = models.TextField(null=True,default='null')
    address = models.TextField(null=True, default='null')
    level = models.TextField(null=True, default='null')
    code = models.TextField(null=True, default='null')
    zone = models.ForeignKey(zone)
    date = models.DateTimeField(auto_now=True, blank=True)

    def natural_key(self):
        return (self.name)

class student(models.Model):
    name = models.TextField(null=True,default='null')
    stu_id = models.TextField(null=True, default='null')
    standard = models.TextField(null=True, default='null')
    zone = models.ForeignKey(zone)
    school = models.ForeignKey(school)
    dob = models.DateTimeField(blank=True, null=True)
    gender = models.IntegerField(default=0)
    address = models.TextField(null=True, default='null')
    contact_num = models.BigIntegerField(default=0)
    father_name = models.TextField(null=True, default='null')
    father_occupation = models.TextField(null=True, default='null')
    mother_name = models.TextField(null=True, default='null')
    mother_occupation = models.TextField(null=True, default='null')
    bnk_accno = models.BigIntegerField(default=0)
    insurance_no = models.BigIntegerField(default=0)
    date = models.DateTimeField(auto_now=True, blank=True)