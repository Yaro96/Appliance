let expect = require('chai').expect;
let request = require('request');

describe('Reset', function (done) {
    this.timeout(5000);
    it('Clean Database', function (done) {
        request('http://localhost:3000/reset', function (error, response, body) {
            expect(response.statusCode).to.equal(205);
            done();
        });
    });
});

describe('Models', function (done) {
    it('Get all models', function (done) {
        request('http://localhost:3000/models', function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("Model's Programs", function (done) {
        request('http://localhost:3000/models/E44JTSB7', function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});

describe('Centrifuges', function (done) {
    it('List of valid centrifuges', function (done) {
        request('http://localhost:3000/centrifuges', function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});

describe('Units', function (done) {

    it('List of all units', function (done) {
        request('http://localhost:3000/units', function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    describe('Power ON', function (done) {
        it('Power ON nonexistent unit', function (done) {
            request('http://localhost:3000/units/powerOn/55', function (error, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
        it('Power ON if OFF', function (done) {
            request('http://localhost:3000/units/powerOn/2', function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it('Power ON if ON', function (done) {
            request('http://localhost:3000/units/powerOn/2', function (error, response, body) {
                expect(response.statusCode).to.equal(202);
                done();
            });
        });
    });

    describe('Power OFF', function (done) {
        it('Power OFF nonexistent unit', function (done) {
            request('http://localhost:3000/units/powerOff/55', function (error, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
        it('Power OFF if ON', function (done) {
            request('http://localhost:3000/units/powerOff/2', function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it('Power OFF if OFF', function (done) {
            request('http://localhost:3000/units/powerOff/2', function (error, response, body) {
                expect(response.statusCode).to.equal(202);
                done();
            });
        });
        it('Power OFF when running or paused', function (done) {
            request('http://localhost:3000/units/powerOff/4', function (error, response, body) {
                expect(response.statusCode).to.equal(403);
                done();
            });
        });
    });

    describe('Run', function (done) {
        it('Run nonexistent unit', function (done) {
            request('http://localhost:3000/units/run/55', function (error, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
        it('Run when not running', function (done) {
            request('http://localhost:3000/units/run/2', function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it('Run when running', function (done) {
            request('http://localhost:3000/units/run/2', function (error, response, body) {
                expect(response.statusCode).to.equal(202);
                done();
            });
        });
    });

    describe('Pause', function (done) {
        it('Pause nonexistent unit', function (done) {
            request('http://localhost:3000/units/pause/55', function (error, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
        it('Pause when running', function (done) {
            request('http://localhost:3000/units/pause/2', function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it('Pause when paused', function (done) {
            request('http://localhost:3000/units/pause/2', function (error, response, body) {
                expect(response.statusCode).to.equal(202);
                done();
            });
        });
        it('Pause when waiting', function (done) {
            request('http://localhost:3000/units/pause/3', function (error, response, body) {
                expect(response.statusCode).to.equal(403);
                done();
            });
        });
    });

    describe('Wait', function (done) {
        it('Wait nonexistent unit', function (done) {
            request('http://localhost:3000/units/wait/55', function (error, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
        it('Wait when not waiting', function (done) {
            request('http://localhost:3000/units/wait/2', function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it('Wait when waiting', function (done) {
            request('http://localhost:3000/units/wait/2', function (error, response, body) {
                expect(response.statusCode).to.equal(202);
                done();
            });
        });
    });

    describe('Add Unit', function (done) {
        it('Add nonexistent model', function (done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     'http://localhost:3000/units',
                body:    "model=3"
            }, function(error, response, body){
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
        it('Add model', function (done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     'http://localhost:3000/units',
                body:    "model=1"
            }, function(error, response, body){
                expect(response.statusCode).to.equal(201);
                done();
            });
        });
    });

    describe('Program', function (done) {
        it('Set program nonexistent unit', function (done) {
            request.patch({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     'http://localhost:3000/units/program/55',
                body:    "program=3"
            }, function(error, response, body){
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
        it('Set program already set', function (done) {
            request.patch({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     'http://localhost:3000/units/program/3',
                body:    "program=9"
            }, function(error, response, body){
                expect(response.statusCode).to.equal(202);
                done();
            });
        });
        it('Set program when not waiting', function (done) {
            request.patch({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     'http://localhost:3000/units/program/4',
                body:    "program=9"
            }, function(error, response, body){
                expect(response.statusCode).to.equal(403);
                done();
            });
        });
        it('Set unavailable program for unit', function (done) {
            request.patch({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     'http://localhost:3000/units/program/3',
                body:    "program=5"
            }, function(error, response, body){
                expect(response.statusCode).to.equal(406);
                done();
            });
        });
        it('Set program', function (done) {
            request.patch({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     'http://localhost:3000/units/program/3',
                body:    "program=4"
            }, function(error, response, body){
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe('Centrifuge', function (done) {
        it('Set centrifuge nonexistent unit', function (done) {
            request.patch({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     'http://localhost:3000/units/centrifuge/55',
                body:    "centrifuge=3"
            }, function(error, response, body){
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
        it('Set centrifuge already set', function (done) {
            request.patch({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     'http://localhost:3000/units/centrifuge/3',
                body:    "centrifuge=3"
            }, function(error, response, body){
                expect(response.statusCode).to.equal(202);
                done();
            });
        });
        it('Set centrifuge when not waiting', function (done) {
            request.patch({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     'http://localhost:3000/units/centrifuge/4',
                body:    "centrifuge=3"
            }, function(error, response, body){
                expect(response.statusCode).to.equal(403);
                done();
            });
        });
        it('Set nonexistent centrifuge', function (done) {
            request.patch({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     'http://localhost:3000/units/centrifuge/3',
                body:    "centrifuge=5"
            }, function(error, response, body){
                expect(response.statusCode).to.equal(406);
                done();
            });
        });
        it('Set centrifuge', function (done) {
            request.patch({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     'http://localhost:3000/units/centrifuge/3',
                body:    "centrifuge=2"
            }, function(error, response, body){
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe('Timer', function (done) {
        it('Set timer nonexistent unit', function (done) {
            request.patch({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     'http://localhost:3000/units/timer/55',
                body:    "minutes=3"
            }, function(error, response, body){
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
        it('Set timer already set', function (done) {
            request.patch({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     'http://localhost:3000/units/timer/3',
                body:    "minutes=0"
            }, function(error, response, body){
                expect(response.statusCode).to.equal(202);
                done();
            });
        });
        it('Set timer when running', function (done) {
            request.patch({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     'http://localhost:3000/units/timer/4',
                body:    "minutes=3"
            }, function(error, response, body){
                expect(response.statusCode).to.equal(403);
                done();
            });
        });
        it('Set timer', function (done) {
            request.patch({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     'http://localhost:3000/units/timer/3',
                body:    "minutes=5"
            }, function(error, response, body){
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe('Toggle Intensive', function (done) {
        it('Toggle intensive nonexistent unit', function (done) {
            request('http://localhost:3000/units/toggleIntensive/55', function (error, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
        it('Toggle intensive when running or paused', function (done) {
            request('http://localhost:3000/units/toggleIntensive/4', function (error, response, body) {
                expect(response.statusCode).to.equal(403);
                done();
            });
        });
        it('Toggle intensive', function (done) {
            request('http://localhost:3000/units/toggleIntensive/2', function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe('Delete Unit', function (done) {
        it('Delete nonexistent unit', function (done) {
            request.delete('http://localhost:3000/units/delete/55', function (error, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
        it('Delete', function (done) {
            request.delete('http://localhost:3000/units/delete/5', function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });
});