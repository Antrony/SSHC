from django import template

register = template.Library()

@register.inclusion_tag('tags/text_field.html')
def input_text(*args,**kwargs):
    return {
        'name': kwargs['name'],
        'classname': kwargs['classname'],
        'fieldname': kwargs['fieldname'],
        'placename':kwargs['placename'],
        'ngmodel': kwargs['ngmodel'],
        'formname':kwargs['formname'],
        'type':kwargs['type']
    }

@register.inclusion_tag('tags/button_field.html')
def form_button(*args, **kwargs):
    return {
        'formname': kwargs['formname'],
        'type':kwargs['type'],
        'buttonname':kwargs['buttonname']
    }