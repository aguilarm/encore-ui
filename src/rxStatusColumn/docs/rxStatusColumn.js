/*jshint unused:false*/

// This file is used to help build the 'demo' documentation page and should be updated with example code
function rxStatusColumnCtrl ($scope, rxStatusMappings) {
    $scope.servers = [
        { status: 'ACTIVE', title: 'ACTIVE status' },
        { status: 'ERROR', title: 'ERROR status' },
        { status: 'BUILD', title: 'BUILD status mapped to INFO' },
        { status: 'REBOOT', title: 'REBOOT status mapped to INFO' },
        { status: 'SUSPENDED', title: 'SUSPENDED status mapped to WARNING' },
        { status: 'DELETING', title: 'DELETING status mapped to WARNING, using `fooApi` mapping', api:'fooApi' },
    ];

    // We have a few different ways of adding mappings. We've tried to show them all here
    rxStatusMappings.addGlobal({
        'DELETING': 'ERROR'
    });
    rxStatusMappings.mapToInfo(['BUILD', 'REBOOT']);
    rxStatusMappings.mapToWarning('SUSPENDED');

    rxStatusMappings.addAPI('fooApi', { 'DELETING': 'WARNING' });
    rxStatusMappings.mapToWarning('SomeApiSpecificStatus', 'fooApi');
}
