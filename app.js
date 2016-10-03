(
    function() {
        angular.module('app', []).
        controller('searchController', searchController).
        directive('foundItems', FoundItems).
        constant('cfg', {
            url: 'https://davids-restaurant.herokuapp.com/menu_items.json',
            HttpTimeout: 5000
        }).service('ItemRetrievalService', itemRetrievalService);

        function FoundItems() {
            var ddo = {
                require: 'E',
                templateUrl: 'html/found-items.html',
                scope: {
                    onRemove: '&',
                    message: '@message',
                    error: '@error',
                    items: '=items'
                }
            };
            return ddo;
        }

        itemRetrievalService.$inject = ['$http', 'cfg'];

        function itemRetrievalService($http, cfg) {
            var ItemService = this;
            ItemService.getItems = function() {
                return $http.get(cfg.url, cfg.HttpTimeout);
            };
        }

        searchController.$inject = ['ItemRetrievalService'];

        function searchController(ItemRetrievalService) {
            var search = this;
            search.error = false;
            search.message = "";
            search.items = [];
            search.ready = false;
            search.removeItem = function removeItem(index) {
                search.items.splice(index, 1);
            };

            // can move this logic to service
            search.searchItem = function searchItem() {
                search.ready = false;
                search.error = false;
                search.items = [];
                ItemRetrievalService.getItems().then(successCALLBack, error);
            };

            function successCALLBack(response) {
                if (response.data !== 'undefined' && response.data.menu_items !== 'undefined') {
                    for (var i = 0; i < response.data.menu_items.length; i++) {
                        if (ItemFilter(response.data.menu_items[i])) {
                            search.items.push(response.data.menu_items[i]);
                        }
                    }
                }
                if (search.items.length === 0) {
                    error();
                }
                search.ready = true;
                search.item = undefined;
            }

            function error() {
                search.ready = true;
                search.error = true;
                search.items = [];
                search.item = undefined;
                search.message = "Nothing Found!";
            }

            function ItemFilter(data) {
                if (data !== 'undefined' && data.description.indexOf(search.item) !== -1) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
)();
