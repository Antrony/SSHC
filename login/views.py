import json
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect

def login_user(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect('/data/')
    else:
        data = request.body.decode('utf-8');
        authData = json.loads(data)
        credentials = authData.get('cred')
        username = credentials.get('uname')
        password = credentials.get('pword')
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                request.session.modified = True
                return HttpResponse('Success')
            else:
                return HttpResponse('Failed')
        else:
            return HttpResponse('Not Valid')

def logout_user(request):
    logout(request)
    request.session.clear()
    request.session.flush()
    return redirect('/data/')
