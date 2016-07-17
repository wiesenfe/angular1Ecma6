import DataService from './Service';
import angular from 'angular';
import { Observable } from 'rx';
var app = angular.module('myMod', [require('angular-mocks/ngMock')]);

describe("Data Service tests", () => {
    let dataService, httpBackend;
    beforeEach(() => {
        inject(function ($injector) {
            httpBackend = $injector.get("$httpBackend");
            dataService = new DataService($injector.get('$http'));
        })
    });
    it("should return an observable from which we can get data", () => {
        let called = false;
        httpBackend.when('GET', '/rest/foo.json').respond(200, { foo: 'bar' });
        dataService.read().subscribe((r) => {
            expect(r.data.foo).toEqual("bar");
            called = true;
        });
        httpBackend.flush();
        expect(called).toBe(true);
    });
    it("should return an observable with an error", () => {
        let called = false;
        httpBackend.when('GET', '/rest/foo.json').respond(500, { error: "error" });
        dataService.read().subscribe((r) => { }, (e) => {
            expect(e.status).toEqual(500);
            called = true;
        });
        httpBackend.flush();
        expect(called).toBe(true);
    });
});