angular.module('demoApp', ['encore.ui', 'ngRoute'])
.controller('componentCtrl', function ($scope, rxBreadcrumbsSvc, $routeParams, component) {
    rxBreadcrumbsSvc.set([{
        name: component.name
    }]);

    $scope.component = component;
})
.config(function ($routeProvider, rxStatusTagsProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/overview'
        })
        .when('/login', {
            templateUrl: 'login.html',
            controller: function (rxBreadcrumbsSvc) {
                rxBreadcrumbsSvc.set();
            }
        })
        .when('/overview', {
            templateUrl: 'overview.html',
            controller: function (rxBreadcrumbsSvc) {
                rxBreadcrumbsSvc.set();
            }
        })
        .when('/styleguide/basics', {
            templateUrl: 'styleguide/basics.html',
            controller: function (rxBreadcrumbsSvc) {
                rxBreadcrumbsSvc.set();
            }            
        })
        .when('/styleguide/layouts', {
            templateUrl: 'styleguide/layouts.html',
            controller: function (rxBreadcrumbsSvc) {
                rxBreadcrumbsSvc.set();
            }
        })
        .when('/styleguide/layouts/1', {
            templateUrl: 'styleguide/layout-1.html',
            controller: function (rxBreadcrumbsSvc) {
                rxBreadcrumbsSvc.set();
            }
        })
        .when('/styleguide/layouts/2', {
            templateUrl: 'styleguide/layout-2.html',
            controller: function (rxBreadcrumbsSvc) {
                rxBreadcrumbsSvc.set();
            }
        })
        .when('/styleguide/layouts/3', {
            templateUrl: 'styleguide/layout-3.html',
            controller: function (rxBreadcrumbsSvc) {
                rxBreadcrumbsSvc.set();
            }
        })        
        .when('/styleguide/buttons', {
            templateUrl: 'styleguide/buttons.html',
            controller: function (rxBreadcrumbsSvc) {
                rxBreadcrumbsSvc.set();
            }
        })
        .when('/styleguide/tables', {
            templateUrl: 'styleguide/tables.html',
            controller: function (rxBreadcrumbsSvc) {
                rxBreadcrumbsSvc.set();
            }
        })
        .when('/styleguide/forms', {
            templateUrl: 'styleguide/forms.html',
            controller: function (rxBreadcrumbsSvc) {
                rxBreadcrumbsSvc.set();
            }
        })
        .when('/styleguide/modals', {
            templateUrl: 'styleguide/modals.html',
            controller: function (rxBreadcrumbsSvc) {
                rxBreadcrumbsSvc.set();
            }
        })
        .when('/component/:component', {
            controller: 'componentCtrl',
            templateUrl: 'component-template.html',
            resolve: {
                'component': function ($route, components) {
                    return _.find(components, {
                        'name': $route.current.params.component
                    });
                }
            }
        });

    // Define a custom status tag for use in the rxBreadcrumbs demo
    rxStatusTagsProvider.addStatus({
        key: 'demo',
        class: 'alpha-status',
        text: 'Demo Tag'
    });
})
.run(function ($rootScope, components, $window, Environment, rxBreadcrumbsSvc) {
    var baseGithubUrl = '//rackerlabs.github.io/encore-ui/';
    Environment.add({
        name: 'ghPages',
        pattern: '//rackerlabs.github.io',
        url: baseGithubUrl + '{{path}}'
    });

    if (Environment.get().name === 'ghPages') {
        rxBreadcrumbsSvc.setHome(baseGithubUrl);
    }

    var demoNav = [
        {
            type: 'highlight',
            title: 'Encore-UI',
            children: [
                {
                    href: '#/overview',
                    linkText: 'Overview'
                },
                {
                    href: 'ngdocs/index.html',
                    linkText: 'JS Docs'
                },
                {
                    linkText: 'Other Links',
                    children: [
                        {
                            linkText: 'GitHub Repos',
                            children: [
                                {
                                    href: 'https://github.com/rackerlabs/encore-ui',
                                    linkText: 'Encore-UI'
                                },
                                {
                                    href: 'https://github.com/rackerlabs/encore-ui-template',
                                    linkText: 'App Template (Private Repo)'
                                },
                                {
                                    href: 'https://github.com/rackerlabs/encore-ui-login',
                                    linkText: 'Common Login (Private Repo)'
                                }
                            ]
                        },
                        {
                            href: 'coverage/index.html',
                            linkText: 'Unit Test Coverage'
                        }
                    ]
                }
            ]
        },
        {
            title: 'Design Styleguide',
            children: [
                {
                    href: '#/styleguide/basics',
                    linkText: 'Basics',
                    children: [
                        {
                            href: '#/styleguide/basics#part1',
                            linkText: 'Typography'
                        },
                        {
                            href: '#/styleguide/basics#part1',
                            linkText: 'Header Styles'
                        },                        
                        {
                            href: '#/styleguide/basics#part2',
                            linkText: 'Descriptions'
                        },
                        {
                            href: '#/styleguide/basics#part3',
                            linkText: 'Lists'
                        },
                        {
                            href: '#/styleguide/basics#part4',
                            linkText: 'Wells'
                        },
                        {
                            href: '#/styleguide/basics#part5',
                            linkText: 'Helper classes'
                        }
                    ]
                },
                {
                    href: '#/styleguide/layouts',
                    linkText: 'Layouts',
                    children: [
                        {
                            linkText: 'Grids'
                        },
                        {
                            linkText: 'Sample Layouts',
                            children: [
                                {
                                    href: '#/styleguide/layouts/1',
                                    linkText: 'Layout #1'
                                },
                                {
                                    href: '#/styleguide/layouts/2',
                                    linkText: 'Layout #2'
                                },
                                {
                                    href: '#/styleguide/layouts/3',
                                    linkText: 'Layout #3'
                                }
                            ]
                        }
                    ]
                },
                {
                    href: '#/styleguide/buttons',
                    linkText: 'Buttons & Links',
                    children: [
                        {
                            href: '#/styleguide/buttons#FIXME',
                            linkText: 'Customizing Buttons'
                        },
                        {
                            href: '#/styleguide/buttons#FIXME',
                            linkText: 'Using Colors and Icons'
                        }                    
                    ]
                },
                {
                    href: '#/styleguide/tables',
                    linkText: 'Tables',
                    children: [
                        {
                            href: '#/styleguide/tables#FIXME',
                            linkText: ''
                        },
                        {
                            href: '#/styleguide/tables#FIXME',
                            linkText: ''
                        }                    
                    ]
                },
                {
                    href: '#/styleguide/forms',
                    linkText: 'Forms'
                },
                {
                    href: '#/styleguide/modals',
                    linkText: 'Modals'
                }
            ]
        },
        {
            title: 'All Components',
            children: []
        }
    ];

    _.each(components, function (component) {
        demoNav[2].children.push({
            href: '#/component/' + component.name,
            linkText: component.name
        });
    });

    $rootScope.demoNav = demoNav;

    $rootScope.$on('$routeChangeSuccess', function() {
        $window.scrollTo(0,0);
    });
})
.directive('rxPrism', function ($timeout) {
    return {
        restrict: 'E',
        template: '<pre><code class="language-{{language}}" ng-transclude></code></pre>',
        scope: {
            language: '@'
        },
        transclude: true,
        link: function (scope, el) {
            // delay execution of Prism until ng bindings have completed
            $timeout(function () {
                var code = el.find('code')[0];
                Prism.highlightElement(code);
            }, 0);
        }
    };
});
