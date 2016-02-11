(function() {
    'use strict';

    angular
        .module('running')

        .constant('API_HOST', "http://localhost:3000/api")
        .constant('moment', moment)
        .constant('_', _)
        .constant('TIMEOUT', 10000);
})();
