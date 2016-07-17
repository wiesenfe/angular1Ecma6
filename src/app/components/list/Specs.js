import Controller from './Controller.js';
import { Observable } from 'rx';
import angular from 'angular';
let empty = () => { };

angular.module('myMod', [require('angular-mocks/ngMock')])

describe("List component controller suite", function () {
    let controller, dataServiceMock, observable;
    beforeEach(inject((_$rootScope_) => {
        // Sets up a test observable
        observable = new Observable.interval(1000).timeInterval().take(3);

        // Sets up jasmine clock
        jasmine.clock().uninstall();
        jasmine.clock().install();

        // Sets up data service mock with spies
        dataServiceMock = { read: empty, readRealTimeUpdates: empty };
        spyOn(dataServiceMock, "read").and.returnValue(Observable.of({ data: { foo: "bar" } }));
        spyOn(dataServiceMock, "readRealTimeUpdates").and.returnValue(observable);
        
        // Sets up a $scope with a spy
        spyOn(_$rootScope_, "$digest")

        // Build controller with mock
        controller = new Controller(dataServiceMock, _$rootScope_);
    }));

    /* List management */
    it("should append stuff to the list and reset the new item", () => {
        expect(controller.list.length).toEqual(0);
        expect(controller.newItem.name).toBeFalsy();
        controller.newItem = { name: "foo" }
        controller.addItem();
        controller.newItem = { name: "bar" }
        controller.addItem();
        expect(controller.list.length).toEqual(2);
        expect(controller.list[0]).toEqual({ name: "foo", id: 0 });
        expect(controller.list[1]).toEqual({ name: "bar", id: 1 });
        expect(controller.newItem.name).toBeFalsy();
    });
    it("should not append anything, newItem has no name", () => {
        controller.addItem();
        expect(controller.list.length).toEqual(0);
    })
    it("should remove one item form the list", () => {
        controller.newItem = { name: "foo" }
        controller.addItem();
        controller.newItem = { name: "bar" }
        controller.addItem();
        controller.removeItem(0);
        expect(controller.list.length).toEqual(1);
        expect(controller.list[0]).toEqual({ name: "bar", id: 1 });
        controller.removeItem(0);
        expect(controller.list.length).toEqual(1);
        controller.removeItem(1);
        expect(controller.list.length).toEqual(0);
    });

    /*  Read data */
    it("should call dataService read", () => {
        controller.updateData();
        expect(dataServiceMock.read).toHaveBeenCalled();
    });
    it("should set data correctly", () => {
        controller.updateData();
        expect(controller.data).toEqual("bar");
    });

    /* Real time data */
    it("should update real time data", () => {
        expect(controller.realTimeData).not.toBeDefined();
        jasmine.clock().tick(1001);
        expect(controller.realTimeData.value).toEqual(0);
        jasmine.clock().tick(1001);
        expect(controller.realTimeData.value).toEqual(1);
        jasmine.clock().tick(1001);
        expect(controller.realTimeData.value).toEqual(2);
        jasmine.clock().tick(1001);
        expect(controller.realTimeData.value).toEqual(2);
    });
    it("should call $digest on the scope", () => {
        jasmine.clock().tick(1001);
        expect(controller.$scope.$digest).toHaveBeenCalled();
    })
});