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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJhcHAucm91dGUuanMiLCJhcHAuY29uZmlnLmpzIiwiYXBwLmNvbnN0YW50LmpzIiwiaG9tZS5jb250cm9sbGVyLmpzIiwidXNlci5yZXNvdXJjZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXJcbiAgLm1vZHVsZSgncnVubmluZycsIFtcbiAgICAnbmdSZXNvdXJjZScsXG4gICAgJ3VpR21hcGdvb2dsZS1tYXBzJyxcbiAgICAnYW5ndWxhck1vbWVudCcsXG4gICAgJ3VpLnJvdXRlcicsXG4gICAgJ3VpLmJvb3RzdHJhcCcsXG4gICAgJ3VpLmJvb3RzdHJhcC1zbGlkZXInXG4gIF0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ3J1bm5pbmcnKVxuICAgIC5jb25maWcocm91dGVyQ29uZmlnKTtcblxuICAvKiogQG5nSW5qZWN0ICovXG4gIGZ1bmN0aW9uIHJvdXRlckNvbmZpZygkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgIC5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgdXJsOiAnLycsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvaG9tZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDb250cm9sbGVyJyxcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nXG4gICAgICB9KTtcblxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcbiAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgncnVubmluZycpXG4gICAgICAgIC5jb25maWcoQ29uZmlndXJhdGlvbik7XG5cbiAgICAvKiBAbmdJbmplY3QgKi9cbiAgICBmdW5jdGlvbiBDb25maWd1cmF0aW9uKCRsb2NhdGlvblByb3ZpZGVyLCAkbG9nUHJvdmlkZXIsIHVpR21hcEdvb2dsZU1hcEFwaVByb3ZpZGVyKSB7XG4gICAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG4gICAgICAvLyBFbmFibGUgbG9nXG4gICAgICAkbG9nUHJvdmlkZXIuZGVidWdFbmFibGVkKHRydWUpO1xuXG4gICAgICB1aUdtYXBHb29nbGVNYXBBcGlQcm92aWRlci5jb25maWd1cmUoe1xuICAgICAgICAgICAgLy8gICAga2V5OiAneW91ciBhcGkga2V5JyxcbiAgICAgICAgICAgIHY6ICczLjE3JyxcbiAgICAgICAgICAgIGxpYnJhcmllczogJ3BsYWNlcycgLy8gUmVxdWlyZWQgZm9yIFNlYXJjaEJveC5cbiAgICAgICAgfSk7XG5cbiAgICB9XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgncnVubmluZycpXG5cbiAgICAgICAgLmNvbnN0YW50KCdBUElfSE9TVCcsIFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaVwiKVxuICAgICAgICAuY29uc3RhbnQoJ21vbWVudCcsIG1vbWVudClcbiAgICAgICAgLmNvbnN0YW50KCdfJywgXylcbiAgICAgICAgLmNvbnN0YW50KCdUSU1FT1VUJywgMTAwMDApO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdydW5uaW5nJylcbiAgICAuY29udHJvbGxlcignSG9tZUNvbnRyb2xsZXInLCBIb21lQ29udHJvbGxlcik7XG5cbiAgLyoqIEBuZ0luamVjdCAqL1xuICBmdW5jdGlvbiBIb21lQ29udHJvbGxlcigkc2NvcGUsIFVzZXIsICR1aWJNb2RhbCkge1xuICAgIC8qIGpzaGludCB2YWxpZHRoaXM6IHRydWUgKi9cbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIHZtLnVzZXJzID0gW107XG4gICAgdm0udXNlciA9IHt9O1xuICAgIHZtLnVwZGF0ZSA9IHVwZGF0ZTtcbiAgICB2bS5zZWFyY2hDb25maWcgPSB7XG4gICAgICByYWRpdXM6IDIwLFxuICAgICAgbGF0OiAwLFxuICAgICAgbG5nOiAwXG4gICAgfTtcbiAgICB2bS5zZWFyY2hib3ggPSB7fTtcbiAgICB2bS5tYXAgPSB7IGNlbnRlcjogeyBsYXRpdHVkZTogNDguODY0LCBsb25naXR1ZGU6IDIuMzYgfSwgem9vbTogMTIgfTtcbiAgICB2bS5vcGVuTW9kYWwgPSBvcGVuTW9kYWw7XG4gICAgdm0uc2F2ZSA9IHNhdmU7XG5cbiAgICB2YXIgZXZlbnRzID0ge1xuICAgICAgcGxhY2VfY2hhbmdlZDpmdW5jdGlvbiAoc2VhcmNoQm94KSB7XG4gICAgICAgICAgdmFyIHBsYWNlID0gc2VhcmNoQm94LmdldFBsYWNlKCk7XG4gICAgICAgICAgaWYgKCFwbGFjZSB8fCBhbmd1bGFyLmlzVW5kZWZpbmVkKHBsYWNlKSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vc2V0IHRoZSBjZW50ZXIgcG9pbnRcbiAgICAgICAgICB2bS5zZWFyY2hDb25maWcubGF0ID0gcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24ubGF0KCk7XG4gICAgICAgICAgdm0uc2VhcmNoQ29uZmlnLmxuZyA9IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLmxuZygpO1xuICAgICAgICAgIC8vIHJlZnJlc2ggdGhlIG1hcFxuICAgICAgICAgIHZtLm1hcCA9IHtcbiAgICAgICAgICAgICAgY2VudGVyOntcbiAgICAgICAgICAgICAgICAgIGxhdGl0dWRlOiAgdm0uc2VhcmNoQ29uZmlnLmxhdCxcbiAgICAgICAgICAgICAgICAgIGxvbmdpdHVkZTogdm0uc2VhcmNoQ29uZmlnLmxuZ1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB6b29tOiAxM1xuICAgICAgICAgIH07XG4gICAgICAgICAgLy8gcmVmcmVzaCB0aGUgbWFya2VyXG4gICAgICAgICAgdm0ubWFya2VyID0ge1xuICAgICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgICAgb3B0aW9uczp7XG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlOmZhbHNlLFxuICAgICAgICAgICAgICAgIHN0cmVldFZpZXdDb250cm9sOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB6b29tQ29udHJvbDogZmFsc2VcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgY29vcmRzOntcbiAgICAgICAgICAgICAgICBsYXRpdHVkZTogIHZtLnNlYXJjaENvbmZpZy5sYXQsXG4gICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiB2bS5zZWFyY2hDb25maWcubG5nXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIHVwZGF0ZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2bS5zZWFyY2hib3ggPSB7XG4gICAgICAgIHRlbXBsYXRlOidzZWFyY2hib3gudHBsLmh0bWwnLFxuICAgICAgICBwYXJlbnRkaXY6IFwiYWRyZXNzRGl2XCIsXG4gICAgICAgIGV2ZW50czogZXZlbnRzLFxuICAgICAgICBvcHRpb25zOntcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZTp0cnVlLFxuICAgICAgICAgICAgdHlwZXM6WydhZGRyZXNzJ10sXG4gICAgICAgICAgICBjb21wb25lbnRSZXN0cmljdGlvbnM6e1xuICAgICAgICAgICAgICAgIGNvdW50cnk6J2ZyJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB1cGRhdGUoKTtcbiAgICBmdW5jdGlvbiBvcGVuTW9kYWwoKSB7XG4gICAgICB2bS5tb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xuICAgICAgICB0ZW1wbGF0ZVVybDogJ21vZGFsLnRwbC5odG1sJyxcbiAgICAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgICAgc2l6ZTogJ3NtJ1xuICAgICAgfSk7XG4gICAgICB2bS5tb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgIHVzZXIuJHNhdmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzYXZlKCkge1xuICAgICAgdmFyIHVzZXIgPSBuZXcgVXNlcih7XG4gICAgICAgIG5hbWU6IHZtLnVzZXIubmFtZSxcbiAgICAgICAgZW1haWw6IHZtLnVzZXIuZW1haWwsXG4gICAgICAgIHBvc2l0aW9uOiBbXG4gICAgICAgICAgdm0uc2VhcmNoQ29uZmlnLmxhdCAsIHZtLnNlYXJjaENvbmZpZy5sbmdcbiAgICAgICAgXVxuICAgICAgfSk7XG4gICAgICB2bS5tb2RhbEluc3RhbmNlLmNsb3NlKHVzZXIpO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgdm0udXNlcnMgPSBVc2VyLnF1ZXJ5KHZtLnNlYXJjaENvbmZpZylcbiAgICB9XG5cbiAgfVxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ3J1bm5pbmcnKVxuICAgICAgICAuc2VydmljZSgnVXNlcicsIFNlcnZpY2UpO1xuXG4gICAgLyogQG5nSW5qZWN0ICovXG4gICAgZnVuY3Rpb24gU2VydmljZSgkcmVzb3VyY2UsIEFQSV9IT1NUKSB7XG4gICAgICByZXR1cm4gJHJlc291cmNlKEFQSV9IT1NUICsgJy91c2VyLzppZCcsXG4gICAgICAgIHtpZDogJ0BfaWQnfSk7XG4gICAgfVxufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
