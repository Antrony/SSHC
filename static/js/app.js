var app = angular.module('sshc',['ui.bootstrap','ngAnimate','toastr','angularUtils.directives.dirPagination']).config(function($interpolateProvider,$httpProvider){
    $interpolateProvider.startSymbol('{$').endSymbol('$}');
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
});