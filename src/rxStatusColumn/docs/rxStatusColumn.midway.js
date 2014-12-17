var rxStatusColumnPage = require('../rxStatusColumn.page.js').rxStatusColumn;
var expect = require('chai').use(require('chai-as-promised')).expect;

describe('rxStatusColumn', function () {
    var rxStatusColumn, all;

    before(function () {
        demoPage.go('#/component/rxStatusColumn');
        rxStatusColumn = rxStatusColumnPage.initialize($('.demo-status-column-table'));
        rxStatusColumn.statusCells().then(function (allStatusCells) {
            all = allStatusCells;
        });
    });

    it('should show element', function () {
        expect(rxStatusColumn.isDisplayed()).to.eventually.be.true;
    });

    it('should have six cells', function () {
        expect(rxStatusColumn.tblStatusCells.count()).to.eventually.equal(6);
    });

    describe('first cell', function () {
        var first;
        before(function () {
            first = all[0];
        });

        it('should have the right input status', function () {
            expect(first.inputStatus).to.eventually.equal('ACTIVE');
        });

        it('should have the correct final status', function () {
            expect(first.finalStatus).to.eventually.equal('ACTIVE');
        });

        it('should have the correct tooltip', function () {
            expect(first.tooltip).to.eventually.equal('ACTIVE');
        });
        
    });

    describe('third cell', function () {
        var third;
        before(function () {
            third = all[2];
        });

        it('should have the right input status', function () {
            expect(third.inputStatus).to.eventually.equal('BUILD');
        });

        it('should have mapped the input status to the correct final status', function () {
            expect(third.finalStatus).to.eventually.equal('INFO');
        });

        it('should have the correct tooltip', function () {
            expect(third.tooltip).to.eventually.equal('BUILD');
        });
    });
    
    describe('last cell', function () {
        var last;
        before(function () {
            last = all[all.length - 1];
        });

        it('should have the right input status', function () {
            expect(last.inputStatus).to.eventually.equal('DELETING');
        });

        it('should have mapped the input status to the correct final status', function () {
            expect(last.finalStatus).to.eventually.equal('WARNING');
        });

        it('should have the correct tooltip', function () {
            expect(last.tooltip).to.eventually.equal('DELETING');
        });

        it('should reference the right api', function () {
            expect(last.api).to.eventually.equal('fooApi');
        });
    });
});
