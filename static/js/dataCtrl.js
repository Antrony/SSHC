app.controller('dataCtrl', function($scope,$http,$log,toastr,$rootScope,$uibModal){

    $rootScope.schoolArray = [];

    $scope.iszoAllSelected = {'check':false}
    $scope.isschAllSelected = {'check':false}
    $scope.isstuAllSelected = {'check':false}

    $scope.currentPage = 1;
    $scope.zonepageSize = $scope.schpageSize = $scope.stupageSize = 10;

    $rootScope.getZone = function(id){
        $http.get('getzone/').then(function successCallback(response){
            $scope.zonelist = response.data;
        });
    }

    $scope.addZone = function(zone){
        $http({
            method:'POST',
            url:'addzone/',
            data:zone
        }).then(function successCallback(response){
            if(response.data == 'Success'){
                $('#addZoneModal').modal('hide');
                $scope.zone = {};
                $scope.getZone();
                toastr.success('Zone Added Successfully', 'Success');
            }
            if(response.data == 'Failed'){
                toastr.error('Adding Zone Failed','Error')
            }
        });
    }

    $scope.delZone =  function(delsch){
        $scope.zoneDelArray = [];
        angular.forEach($scope.zonelist, function(zone){
            if (zone.selected){
                  $scope.zoneDelArray.push(zone.pk)
            };
        });
        if($scope.zoneDelArray.length == 0){
            toastr.info('Please Select Atleast one', 'Info');
            return false
        }
        else{
        $http({
            method:'POST',
            url:'delzone/',
            data: { 'id':JSON.stringify($scope.zoneDelArray) }
        }).then(function successCallback(response){
            if(response.data == 'Success'){
                $rootScope.getZone();
                toastr.success('School Deleted Successfully','Success');
            }

            if(response.data == 'Failed'){
                toastr.error('Deleting School Failed','Failed');
            }
        });
    }
    }

    $scope.openZoneModal =  function(){
        $scope.zoneArray = [];
        angular.forEach($scope.zonelist, function(zone){
            if (zone.selected){ $scope.zoneArray.push(zone.pk) };
        });

        if($scope.zoneArray.length == 0){
            toastr.info('Please Select Atleast one', 'Info');
            return false
        }

        if($scope.zoneArray.length > 1){
            toastr.info('Multi Select Not Allowed', 'Info');
        }else{
            $rootScope.edit_id = $scope.zoneArray[0]
            $.ajax({
                type:'GET',
                url:'getzonebid/',
                data:{'id':$scope.zoneArray[0]},
                success:function(response){
                    $scope.editZone = response[0].fields
                    var modalInstance = $uibModal.open({
                        animation: 'true',
                        templateUrl: 'zoneEditModal',
                        controller: 'ZoneCtrl',
                        backdrop: true,
                        size: 'lg',
                        resolve: {
                            editZone: function () {
                                return $scope.editZone
                            }
                        }
                    });
                    modalInstance.result.then(function (selectedItem) {
                        $scope.selected = selectedItem;
                    }, function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                }
            })
        }
    };

    $scope.zonetoggleAll = function(iszoAllSelected) {
         var toggleStatus = iszoAllSelected;
         angular.forEach($scope.zonelist, function(itm){ itm.selected = toggleStatus; });
    }

    $scope.optionToggled = function(zonelist){
        $scope.iszoAllSelected.check = zonelist.every(function(itm){ return itm.selected; });
    }

    $scope.reset = function(name) {
        $scope.zoneform.$setPristine();
        $scope.zoneform.$setUntouched();
        $scope.zoneform.$submitted = false;
    };

//    School Control
    $rootScope.getSchool = function(id){
        $http({
            method:'GET',
            url:'getschool/',
        }).then(function successCallback(response){
            $scope.schlist = response.data;
        });
    }

    $scope.addSchool = function(sch){
        $http({
            method:'POST',
            url:'addschool/',
            data:sch
        }).then(function successCallback(response){
            if(response.data == 'Success'){
                $('#addSchModal').modal('hide');
                $scope.sch = {};
                $scope.getSchool();
                toastr.success('School Added Successfully', 'Success');
            }
            if(response.data == 'Failed'){
                toastr.error('Adding School Failed','Error')
            }
        });
    }


    $scope.delSchool =  function(delsch){
        $scope.schDelArray = [];
        angular.forEach($scope.schlist, function(sch){
            if (sch.selected){
                  $scope.schDelArray.push(sch.pk)
            };
        });
        if($scope.schDelArray.length == 0){
            toastr.info('Please Select Atleast one', 'Info');
            return false
        }
        else{
        $http({
            method:'POST',
            url:'delschool/',
            data: { 'id':JSON.stringify($scope.schDelArray) }
        }).then(function successCallback(response){
            if(response.data == 'Success'){
                $rootScope.getSchool();
                toastr.success('School Deleted Successfully','Success');
            }

            if(response.data == 'Failed'){
                toastr.error('Deleting School Failed','Failed');
            }
        });
    }
    }

    $scope.getschbasezid = function(zid){
     $.ajax({
        type:'GET',
        url:'getschbzid/',
        data:{ 'zid':zid },
        success:function(response){
        $scope.schbzlist = response
        }
    })
    };

    $scope.openSchModal =  function(){
        $scope.schArray = [];
        angular.forEach($scope.schlist, function(sch){
            if (sch.selected){ $scope.schArray.push(sch.pk) };
        });

        if($scope.schArray.length == 0){
            toastr.info('Please Select Atleast one', 'Info');
            return false
        }

        if($scope.schArray.length > 1){
            toastr.info('Multi Select Not Allowed', 'Info');
        }else{
            $rootScope.edit_id = $scope.schArray[0]
            $.ajax({
                type:'GET',
                url:'getschbid/',
                data:{'id':$scope.schArray[0]},
                success:function(response){
                    $scope.editSch = response[0].fields
                    var modalInstance = $uibModal.open({
                        animation: 'true',
                        templateUrl: 'schEditModal',
                        controller: 'SchCtrl',
                        backdrop: true,
                        size: 'lg',
                        resolve: {
                            editSch: function () {
                                return $scope.editSch
                            },
                            zone: function(){
                                return $scope.zonelist
                            }
                        }
                    });
                    modalInstance.result.then(function (selectedItem) {
                        $scope.selected = selectedItem;
                    }, function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                }
            })
        }
    };

    $scope.schtoggleAll = function(isschAllSelected) {
         var toggleStatus = isschAllSelected;
         angular.forEach($scope.schlist, function(itm){ itm.selected = toggleStatus; });
    }

    $scope.optionToggled = function(schlist){
        $scope.isschAllSelected.check = schlist.every(function(itm){ return itm.selected; });
    }

    $scope.reset = function(name) {
        $scope.schform.$setPristine();
        $scope.schform.$setUntouched();
        $scope.schform.$submitted = false;
    };

    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };
$rootScope.getStudent = function(id){
        $http.get('getstudent/').then(function successCallback(response){
            $scope.stulist = response.data;
        });
    }

$scope.addStudent = function(stu){
        $http({
            method:'POST',
            url:'addstudent/',
            data:stu
        }).then(function successCallback(response){
            if(response.data == 'Success'){
                $('#addStuModal').modal('hide');
                $scope.stu = {};
                $scope.getStudent();
                toastr.success('Student Added Successfully', 'Success');
            }
            if(response.data == 'Failed'){
                toastr.error('Adding Student Failed','Error')
            }
        });
    }

$scope.delStudent =  function(delstu){
    $scope.stuDelArray = [];
    angular.forEach($scope.stulist, function(stu){
        if (stu.selected){
              $scope.stuDelArray.push(stu.pk)
        };
    });
     if($scope.stuDelArray.length == 0){
            toastr.info('Please Select Atleast one', 'Info');
            return false
        }
    else{
    $http({
        method:'POST',
        url:'delstudent/',
        data: { 'id':JSON.stringify($scope.stuDelArray) }
    }).then(function successCallback(response){
        if(response.data == 'Success'){
            $rootScope.getStudent();
            toastr.success('Student Deleted Successfully','Success');
        }

        if(response.data == 'Failed'){
            toastr.error('Deleting Student Failed','Failed');
        }
    });
}
}

$scope.openStuModal =  function(){
        $scope.stuArray = [];
        angular.forEach($scope.stulist, function(stu){
            if (stu.selected){ $scope.stuArray.push(stu.pk) };
        });
        if($scope.stuArray.length == 0){
            toastr.info('Please Select Atleast one', 'Info');
            return false
        }
        if($scope.stuArray.length > 1){
            toastr.info('Multi Select Not Allowed', 'Info');
        }else{
            $rootScope.edit_id = $scope.stuArray[0]
            $.ajax({
                type:'GET',
                url:'getstubid/',
                data:{'id':$scope.stuArray[0]},
                success:function(response){
                    $scope.editStu = response[0].fields
                    var modalInstance = $uibModal.open({
                        animation: 'true',
                        templateUrl: 'stuEditModal',
                        controller: 'StuCtrl',
                        backdrop: true,
                        size: 'lg',
                        resolve: {
                            editStu: function () {
                                return $scope.editStu
                            },
                            zone: function(){
                                return $scope.zonelist
                            },
                            school: function(){
                                return $scope.schlist
                            }
                        }
                    });
                    modalInstance.result.then(function (selectedItem) {
                        $scope.selected = selectedItem;
                    }, function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                }
            })
        }
    };

    $scope.stutoggleAll = function(isstuAllSelected) {
         var toggleStatus = isstuAllSelected;
         angular.forEach($scope.stulist, function(itm){ itm.selected = toggleStatus; });
    }

    $scope.optionToggled = function(stulist){
        $scope.isstuAllSelected.check = stulist.every(function(itm){ return itm.selected; });
    }

    $scope.reset = function(name) {
        $scope.stuform.$setPristine();
        $scope.stuform.$setUntouched();
        $scope.stuform.$submitted = false;
    };
});

app.controller('ZoneCtrl', function ($scope, $uibModalInstance, $http, $rootScope, editZone, toastr){
    $scope.editZone = editZone;

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

     $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
        $scope.zone = {};
        $scope.editZone = {};
        $scope.edit_id = "";
     };

    $scope.updateZone = function(zone){
        $http({
            method:'POST',
            url:'editzone/',
            data:{'eid':$scope.edit_id,'editzone':zone}
        }).then(function successCallback(response){
            if(response.data == 'Success'){
                $scope.cancel();
                $rootScope.getZone();
                toastr.success('Zone Updated Successfully','Success')
            }else{
                toastr.error('Updating Zone Failed','Fail')
            }
        });
    }

});

app.controller('SchCtrl', function ($scope, $uibModalInstance, $http, $rootScope, editSch, zone, toastr){
    $scope.editSch = editSch;
    $scope.zone = zone;

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

     $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
        $scope.sch = {};
        $scope.editSch = {};
        $scope.edit_id = "";
     };

    $scope.updateSch = function(schl){
        $http({
            method:'POST',
            url:'editschool/',
            data:{'eid':$scope.edit_id,'editsch':schl}
        }).then(function successCallback(response){
            if(response.data == 'Success'){
                $scope.cancel();
                $rootScope.getSchool();
                toastr.success('School Updated Successfully','Success')
            }else{
                toastr.error('Updating School Failed','Fail')
            }
        });
    }

});

app.controller('StuCtrl', function ($scope, $uibModalInstance, $http, $rootScope, editStu, zone, school, toastr){
    $scope.editStu = editStu;
    $scope.zone = zone;
    $scope.school = school;

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

     $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
        $scope.stu = {};
        $scope.editStu = {};
        $scope.edit_id = "";
     };

    $scope.updateStu = function(stud){
    console.log(stud)
        $http({
            method:'POST',
            url:'editstudent/',
            data:{'eid':$scope.edit_id,'editstu':stud}
        }).then(function successCallback(response){
            if(response.data == 'Success'){
                $scope.cancel();
                $rootScope.getStudent();
                toastr.success('Student Details Updated Successfully','Success')
            }else{
                toastr.error('Updating Student Details Failed','Fail')
            }
        });
    }

});