(
  function(){
    'use strict';
    angular.module('application',[]).controller('listFood',listFood);

    //   injecting scope object in listFood controller

    listFood.$inject = ['$scope'];

    function listFood($scope){
      $scope.message = "";
      $scope.customStyle = {};
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
              $scope.customStyle.color = "red";
      }
    };

    function checkLength(items,filteredItems){
      if(filteredItems.length > 3){
        $scope.message = "Too much!";
        $scope.customStyle.color = "red";
      }else{
        $scope.message = "Enjoy!";
        $scope.customStyle.color = "green";
      }
      if(filteredItems.length < 3 && items.length>=3){
        $scope.message = "Please enter data! Not Empty OR Space comma separated items";
        $scope.customStyle.color = "red";
      }
    }

    function isEmpty(str) {
        return str.replace(/^\s+|\s+$/g, '').length === 0;
    }
  }
}
)();
