/*jshint node:true*/
var Page = require('astrolabe').Page;

exports.rxSpinner = Page.create({
    // Elements
    rxSpinnerElement: {
        get: function () {
            return element(by.id('rxSpinnerElement'));
        }
    }
});
