from django.shortcuts import render

def about(request):
    return render(request, 'statfiles/about.html')

def contact(request):
    return render(request, 'statfiles/contact.html')
