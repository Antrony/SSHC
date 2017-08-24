// login control
app.controller('loginCtrl',function($http,$scope,toastr,$window){
    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;
//    var $modalAnimateTime = 300;
    $scope.validUser = function(cred){
        $http.post('/login/',{'cred':cred}).then(function successCallback(response){
            if(response.data == 'Success'){
                msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Logged in Successfully");
                $window.location.href = '/data/'
                }
            if(response.data == 'Failed')
                msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login Failed! Please check your credentials!");
            if(response.data == 'Not Valid')
                msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login Failed! Please check your credentials!");
        });
    }
    function msgFade ($msgId, $msgText) {
        $msgId.fadeOut($msgAnimateTime, function() {
            $(this).text($msgText).fadeIn($msgAnimateTime);
        });
    }

    function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
        var $msgOld = $divTag.text();
        msgFade($textTag, $msgText);
        $divTag.addClass($divClass);
        $iconTag.removeClass("glyphicon-chevron-right");
        $iconTag.addClass($iconClass + " " + $divClass);
        setTimeout(function() {
            msgFade($textTag, $msgOld);
            $divTag.removeClass($divClass);
            $iconTag.addClass("glyphicon-chevron-right");
            $iconTag.removeClass($iconClass + " " + $divClass);
  		}, $msgShowTime);
    }
});