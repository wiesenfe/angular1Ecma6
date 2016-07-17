import Controller from './Controller.js';
import { Observable } from 'rx';
let empty = () => {};

describe("List component controller suite", function () {
    let controller, dataServiceMock, observable;
    beforeEach(() => {
        observable = new Observable.interval(1000).timeInterval().take(3);
        jasmine.clock().uninstall();
        jasmine.clock().install();
        dataServiceMock = { read: empty, readRealTimeUpdates: empty };
        spyOn(dataServiceMock, "read").and.returnValue("10%");
        spyOn(dataServiceMock, "readRealTimeUpdates").and.returnValue(observable);
        controller = new Controller(dataServiceMock);
    });
    it("should append stuff to the list and reset the new item", () => {
        expect(controller.list.length).toEqual(0);
        expect(controller.newItem.name).toBeFalsy();
        controller.newItem = { name: "foo" }
        controller.addItem();
        expect(controller.list.length).toEqual(1);
        expect(controller.list[0].name).toEqual("foo");
        expect(controller.newItem.name).toBeFalsy();
    });
    it("should not append anything, newItem has no name", () => {
        controller.addItem();
        expect(controller.list.length).toEqual(0);
    })
    it("should call dataService read", () => {
        controller.updateData();
        expect(dataServiceMock.read).toHaveBeenCalled();
    });
    it("should set data correctly", () => {
        controller.updateData();
        expect(controller.data).toEqual("10%");
    });
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
});