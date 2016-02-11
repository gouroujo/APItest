(function() {
  'use strict';

  angular
    .module('running')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController($scope, User, $uibModal) {
    /* jshint validthis: true */
    var vm = this;
    vm.users = [];
    vm.user = {};
    vm.update = update;
    vm.searchConfig = {
      radius: 20,
      lat: 0,
      lng: 0
    };
    vm.searchbox = {};
    vm.map = { center: { latitude: 48.864, longitude: 2.36 }, zoom: 12 };
    vm.openModal = openModal;
    vm.save = save;

    var events = {
      place_changed:function (searchBox) {
          var place = searchBox.getPlace();
          if (!place || angular.isUndefined(place)) {
              return;
          }
          //set the center point
          vm.searchConfig.lat = place.geometry.location.lat();
          vm.searchConfig.lng = place.geometry.location.lng();
          // refresh the map
          vm.map = {
              center:{
                  latitude:  vm.searchConfig.lat,
                  longitude: vm.searchConfig.lng
              },
              zoom: 13
          };
          // refresh the marker
          vm.marker = {
              id: 1,
              options:{
                draggable:false,
                streetViewControl: false,
                zoomControl: false
              },
              coords:{
                latitude:  vm.searchConfig.lat,
                longitude: vm.searchConfig.lng
              }
          };
          update();
      }
    };

    vm.searchbox = {
        template:'searchbox.tpl.html',
        parentdiv: "adressDiv",
        events: events,
        options:{
            autocomplete:true,
            types:['address'],
            componentRestrictions:{
                country:'fr'
            }
        }
    };
    update();
    function openModal() {
      vm.modalInstance = $uibModal.open({
        templateUrl: 'modal.tpl.html',
        scope: $scope,
        size: 'sm'
      });
      vm.modalInstance.result.then(function (user) {
        user.$save();
      });
    }
    function save() {
      var user = new User({
        name: vm.user.name,
        email: vm.user.email,
        position: [
          vm.searchConfig.lat , vm.searchConfig.lng
        ]
      });
      vm.modalInstance.close(user);
    }


    function update() {
      vm.users = User.query(vm.searchConfig)
    }

  }
})();
