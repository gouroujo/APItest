(function() {
    'use strict';

    angular
        .module('running')
        .service('User', Service);

    /* @ngInject */
    function Service($resource, API_HOST) {
      return $resource(API_HOST + '/user/:id',
        {id: '@_id'});
    }
})();
