(function() {
    'use strict';

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
