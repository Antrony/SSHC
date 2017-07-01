app.controller('dataCtrl', function($scope,$http,$log,toastr,$rootScope,$uibModal){

    $rootScope.schoolArray = [];

    $scope.isAllSelected = {'check':false}

    $scope.currentPage = 1;
    $scope.pageSize = 10;


    $scope.getZone = function(id){
        $http.get('getzone/').then(function successCallback(response){
            $scope.zonelist = response.data;
        });
    }

    $rootScope.getSchool = function(id){
        $http({
            method:'GET',
            url:'getschool/',
        }).then(function successCallback(response){
            $scope.schlist = response.data;
        });
    }

    $scope.addSchool = function(sch){
        console.log(sch)
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

    $scope.getStudent = function(id){
        $http.get('getstudent/').then(function successCallback(response){
            $scope.stulist = response.data;
        });
    }

    $scope.delSchool =  function(delsch){
        $scope.schDelArray = [];
        angular.forEach($scope.schlist, function(sch){
            if (sch.selected){
                  $scope.schDelArray.push(sch.pk)
            };
        });

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
            console.log($rootScope.edit_id)
            $.ajax({
                type:'GET',
                url:'getschbid/',
                data:{'id':$scope.schArray[0]},
                success:function(response){
                    $scope.editSch = response[0].fields
                    console.log($scope.editSch)
                    var modalInstance = $uibModal.open({
                        animation: 'true',
                        templateUrl: 'schEditModal.html',
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


    $scope.toggleAll = function(isAllSelected) {
         var toggleStatus = isAllSelected;
         angular.forEach($scope.schlist, function(itm){ itm.selected = toggleStatus; });
    }

    $scope.optionToggled = function(schlist){
        $scope.isAllSelected.check = schlist.every(function(itm){ return itm.selected; });
    }

    $scope.reset = function(name) {
        $scope.schform.$setPristine();
        $scope.schform.$setUntouched();
        $scope.schform.$submitted = false;
    };

    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };

});

app.controller('SchCtrl', function ($scope, $uibModalInstance, $http, $rootScope, editSch,zone, toastr){
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
            console.log(response);
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