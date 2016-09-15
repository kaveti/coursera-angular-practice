(
  function(){
    'use strict';
    angular.module('application',[]).controller('listFood',listFood);

    //   injecting scope object in listFood controller

    listFood.$inject = ['$scope'];

    function listFood($scope){
      $scope.message = "";
      $scope.checkListOfItems = function validateList() {
        if(typeof $scope.listOfFoodItems !== "undefined"){
            var items = $scope.listOfFoodItems.split(",");
            var filteredItems = [];
            items.forEach(function(data) {
                if(!isEmpty(data)){
                  filteredItems.push(data);
                }
            });
            checkLength(items,filteredItems);
        }else {
              $scope.message = "Please enter data first";
        }
      }

      function checkLength(items,filteredItems){
        if(filteredItems.length > 3){
          $scope.message = "Too much!";
        }else{
          $scope.message = "Enjoy!";
        }
        if(filteredItems.length < 3 && items.length>=3){
          $scope.message = "Please enter data Not Empty comma separated items";
        }
      }

      function isEmpty(str) {
          return str.replace(/^\s+|\s+$/g, '').length == 0;
      }
    }
  }
)();
