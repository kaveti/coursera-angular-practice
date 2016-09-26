(
  function(){
    angular.module('app',[]).
    controller('products',products).
    controller('basket',basket).
    service('productsInvService',productsInv);
    //   injecting scope object in listFood controller
    products.$inject = ['productsInvService'];
    function products(productsInvService){
      var products = this;
      products.items = productsInvService.getItems();
      products.addToBasket = function(index){
        productsInvService.addToBasket(index);
      };
    }

    basket.$inject = ['productsInvService'];
    function basket(productsInvService){
      var basket = this;
      basket.items = productsInvService.getBasketItems();
      basket.msg = productsInvService.getMessage();
    }

  function productsInv(){
      this.basket = [];
      this.message = "Nothing bought yet.";
      this.items = [
          {
             "name" : "cookies",
             "quantity" : 10
          },
          {
             "name" : "potato",
             "quantity" : 12
          },
          {
             "name" : "tomato",
             "quantity" : 11
          },
          {
             "name" : "ginger",
             "quantity" : 1
          },
          {
             "name" : "garlic",
             "quantity" : 13
          },
          {
             "name" : "biscuits",
             "quantity" : 5
          }
      ];
      this.getItems = function(){
                          return this.items;
                  }
      this.getMessage = function(){
                          return this.message;
                  }
      this.addToBasket = function(index){
                   if(this.items.length >= 0){
                     var item = this.items.splice(index,1);
                     this.basket.push(item[0]);
                     this.message = "";
                   }
              }
        this.getBasketItems = function(){
              return this.basket;
        }
      }
}
)();
