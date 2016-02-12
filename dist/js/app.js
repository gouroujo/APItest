(function() {
  'use strict';

  angular
  .module('running', [
    'ngResource',
    'uiGmapgoogle-maps',
    'angularMoment',
    'ui.router',
    'ui.bootstrap',
    'ui.bootstrap-slider'
  ]);

})();

(function() {
  'use strict';

  routerConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  angular
    .module('running')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();

(function() {
    'use strict';

    Configuration.$inject = ["$locationProvider", "$logProvider", "uiGmapGoogleMapApiProvider"];
    angular
        .module('running')
        .config(Configuration);

    /* @ngInject */
    function Configuration($locationProvider, $logProvider, uiGmapGoogleMapApiProvider) {
      $locationProvider.html5Mode(true);
      // Enable log
      $logProvider.debugEnabled(true);

      uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.17',
            libraries: 'places' // Required for SearchBox.
        });

    }
})();

(function() {
    'use strict';

    angular
        .module('running')

        .constant('API_HOST', "http://localhost:3000/api")
        .constant('moment', moment)
        .constant('_', _)
        .constant('TIMEOUT', 10000);
})();

(function() {
  'use strict';

  HomeController.$inject = ["$scope", "User", "$uibModal"];
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
        position: {
          type: 'Point',
          coordinates: [vm.searchConfig.lng , vm.searchConfig.lat]
        }
      });
      vm.modalInstance.close(user);
    }


    function update() {
      vm.users = User.query(vm.searchConfig)
    }

  }
})();

(function() {
    'use strict';

    Service.$inject = ["$resource", "API_HOST"];
    angular
        .module('running')
        .service('User', Service);

    /* @ngInject */
    function Service($resource, API_HOST) {
      return $resource(API_HOST + '/user/:id',
        {id: '@_id'});
    }
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJhcHAucm91dGUuanMiLCJhcHAuY29uZmlnLmpzIiwiYXBwLmNvbnN0YW50LmpzIiwiaG9tZS5jb250cm9sbGVyLmpzIiwidXNlci5yZXNvdXJjZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhclxuICAubW9kdWxlKCdydW5uaW5nJywgW1xuICAgICduZ1Jlc291cmNlJyxcbiAgICAndWlHbWFwZ29vZ2xlLW1hcHMnLFxuICAgICdhbmd1bGFyTW9tZW50JyxcbiAgICAndWkucm91dGVyJyxcbiAgICAndWkuYm9vdHN0cmFwJyxcbiAgICAndWkuYm9vdHN0cmFwLXNsaWRlcidcbiAgXSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgncnVubmluZycpXG4gICAgLmNvbmZpZyhyb3V0ZXJDb25maWcpO1xuXG4gIC8qKiBAbmdJbmplY3QgKi9cbiAgZnVuY3Rpb24gcm91dGVyQ29uZmlnKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlclxuICAgICAgLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9ob21lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnSG9tZUNvbnRyb2xsZXInLFxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcbiAgICAgIH0pO1xuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdydW5uaW5nJylcbiAgICAgICAgLmNvbmZpZyhDb25maWd1cmF0aW9uKTtcblxuICAgIC8qIEBuZ0luamVjdCAqL1xuICAgIGZ1bmN0aW9uIENvbmZpZ3VyYXRpb24oJGxvY2F0aW9uUHJvdmlkZXIsICRsb2dQcm92aWRlciwgdWlHbWFwR29vZ2xlTWFwQXBpUHJvdmlkZXIpIHtcbiAgICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcbiAgICAgIC8vIEVuYWJsZSBsb2dcbiAgICAgICRsb2dQcm92aWRlci5kZWJ1Z0VuYWJsZWQodHJ1ZSk7XG5cbiAgICAgIHVpR21hcEdvb2dsZU1hcEFwaVByb3ZpZGVyLmNvbmZpZ3VyZSh7XG4gICAgICAgICAgICAvLyAgICBrZXk6ICd5b3VyIGFwaSBrZXknLFxuICAgICAgICAgICAgdjogJzMuMTcnLFxuICAgICAgICAgICAgbGlicmFyaWVzOiAncGxhY2VzJyAvLyBSZXF1aXJlZCBmb3IgU2VhcmNoQm94LlxuICAgICAgICB9KTtcblxuICAgIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdydW5uaW5nJylcblxuICAgICAgICAuY29uc3RhbnQoJ0FQSV9IT1NUJywgXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpXCIpXG4gICAgICAgIC5jb25zdGFudCgnbW9tZW50JywgbW9tZW50KVxuICAgICAgICAuY29uc3RhbnQoJ18nLCBfKVxuICAgICAgICAuY29uc3RhbnQoJ1RJTUVPVVQnLCAxMDAwMCk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ3J1bm5pbmcnKVxuICAgIC5jb250cm9sbGVyKCdIb21lQ29udHJvbGxlcicsIEhvbWVDb250cm9sbGVyKTtcblxuICAvKiogQG5nSW5qZWN0ICovXG4gIGZ1bmN0aW9uIEhvbWVDb250cm9sbGVyKCRzY29wZSwgVXNlciwgJHVpYk1vZGFsKSB7XG4gICAgLyoganNoaW50IHZhbGlkdGhpczogdHJ1ZSAqL1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgdm0udXNlcnMgPSBbXTtcbiAgICB2bS51c2VyID0ge307XG4gICAgdm0udXBkYXRlID0gdXBkYXRlO1xuICAgIHZtLnNlYXJjaENvbmZpZyA9IHtcbiAgICAgIHJhZGl1czogMjAsXG4gICAgICBsYXQ6IDAsXG4gICAgICBsbmc6IDBcbiAgICB9O1xuICAgIHZtLnNlYXJjaGJveCA9IHt9O1xuICAgIHZtLm1hcCA9IHsgY2VudGVyOiB7IGxhdGl0dWRlOiA0OC44NjQsIGxvbmdpdHVkZTogMi4zNiB9LCB6b29tOiAxMiB9O1xuICAgIHZtLm9wZW5Nb2RhbCA9IG9wZW5Nb2RhbDtcbiAgICB2bS5zYXZlID0gc2F2ZTtcblxuICAgIHZhciBldmVudHMgPSB7XG4gICAgICBwbGFjZV9jaGFuZ2VkOmZ1bmN0aW9uIChzZWFyY2hCb3gpIHtcbiAgICAgICAgICB2YXIgcGxhY2UgPSBzZWFyY2hCb3guZ2V0UGxhY2UoKTtcbiAgICAgICAgICBpZiAoIXBsYWNlIHx8IGFuZ3VsYXIuaXNVbmRlZmluZWQocGxhY2UpKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy9zZXQgdGhlIGNlbnRlciBwb2ludFxuICAgICAgICAgIHZtLnNlYXJjaENvbmZpZy5sYXQgPSBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbi5sYXQoKTtcbiAgICAgICAgICB2bS5zZWFyY2hDb25maWcubG5nID0gcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24ubG5nKCk7XG4gICAgICAgICAgLy8gcmVmcmVzaCB0aGUgbWFwXG4gICAgICAgICAgdm0ubWFwID0ge1xuICAgICAgICAgICAgICBjZW50ZXI6e1xuICAgICAgICAgICAgICAgICAgbGF0aXR1ZGU6ICB2bS5zZWFyY2hDb25maWcubGF0LFxuICAgICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiB2bS5zZWFyY2hDb25maWcubG5nXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHpvb206IDEzXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvLyByZWZyZXNoIHRoZSBtYXJrZXJcbiAgICAgICAgICB2bS5tYXJrZXIgPSB7XG4gICAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgICBvcHRpb25zOntcbiAgICAgICAgICAgICAgICBkcmFnZ2FibGU6ZmFsc2UsXG4gICAgICAgICAgICAgICAgc3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHpvb21Db250cm9sOiBmYWxzZVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBjb29yZHM6e1xuICAgICAgICAgICAgICAgIGxhdGl0dWRlOiAgdm0uc2VhcmNoQ29uZmlnLmxhdCxcbiAgICAgICAgICAgICAgICBsb25naXR1ZGU6IHZtLnNlYXJjaENvbmZpZy5sbmdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgdXBkYXRlKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZtLnNlYXJjaGJveCA9IHtcbiAgICAgICAgdGVtcGxhdGU6J3NlYXJjaGJveC50cGwuaHRtbCcsXG4gICAgICAgIHBhcmVudGRpdjogXCJhZHJlc3NEaXZcIixcbiAgICAgICAgZXZlbnRzOiBldmVudHMsXG4gICAgICAgIG9wdGlvbnM6e1xuICAgICAgICAgICAgYXV0b2NvbXBsZXRlOnRydWUsXG4gICAgICAgICAgICB0eXBlczpbJ2FkZHJlc3MnXSxcbiAgICAgICAgICAgIGNvbXBvbmVudFJlc3RyaWN0aW9uczp7XG4gICAgICAgICAgICAgICAgY291bnRyeTonZnInXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHVwZGF0ZSgpO1xuICAgIGZ1bmN0aW9uIG9wZW5Nb2RhbCgpIHtcbiAgICAgIHZtLm1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAnbW9kYWwudHBsLmh0bWwnLFxuICAgICAgICBzY29wZTogJHNjb3BlLFxuICAgICAgICBzaXplOiAnc20nXG4gICAgICB9KTtcbiAgICAgIHZtLm1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgdXNlci4kc2F2ZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNhdmUoKSB7XG4gICAgICB2YXIgdXNlciA9IG5ldyBVc2VyKHtcbiAgICAgICAgbmFtZTogdm0udXNlci5uYW1lLFxuICAgICAgICBlbWFpbDogdm0udXNlci5lbWFpbCxcbiAgICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgICB0eXBlOiAnUG9pbnQnLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBbdm0uc2VhcmNoQ29uZmlnLmxuZyAsIHZtLnNlYXJjaENvbmZpZy5sYXRdXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdm0ubW9kYWxJbnN0YW5jZS5jbG9zZSh1c2VyKTtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgIHZtLnVzZXJzID0gVXNlci5xdWVyeSh2bS5zZWFyY2hDb25maWcpXG4gICAgfVxuXG4gIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdydW5uaW5nJylcbiAgICAgICAgLnNlcnZpY2UoJ1VzZXInLCBTZXJ2aWNlKTtcblxuICAgIC8qIEBuZ0luamVjdCAqL1xuICAgIGZ1bmN0aW9uIFNlcnZpY2UoJHJlc291cmNlLCBBUElfSE9TVCkge1xuICAgICAgcmV0dXJuICRyZXNvdXJjZShBUElfSE9TVCArICcvdXNlci86aWQnLFxuICAgICAgICB7aWQ6ICdAX2lkJ30pO1xuICAgIH1cbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
