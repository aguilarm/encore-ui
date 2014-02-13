'use strict';

angular.module('billingApp', ['ngRoute', 'ngResource', 'encore.ui.tpls', 'encore.ui.rxForm', 'encore.ui.rxPaginate',
        'billingSvc'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/billing/overview/:accountnumber', {
                templateUrl: '/views/billing/overview.html',
                controller: 'OverviewCtrl'
            })
            .otherwise({
                redirectTo: '/login'
            });

        $locationProvider.html5Mode(true).hashPrefix('!');
    });
