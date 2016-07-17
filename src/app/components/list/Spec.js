import Controller from './Controller.js';
import { Observable } from 'rx';

describe("List component controller suite", function () {
   let controller, dataService, observable;
    beforeEach(() => {
        observable = new Observable.interval(1000).timeInterval().take(3);
        jasmine.clock().uninstall();
        jasmine.clock().install();
        dataService = {
            read: () => {},
            readRealTimeUpdates: () => {}
        };
        spyOn(dataService, "read").and.returnValue("10%");
        spyOn(dataService, "readRealTimeUpdates").and.returnValue(observable);
        controller = new Controller(dataService);
    });
    it("should call dataService read", () => {
        controller.updateData();
        expect(dataService.read).toHaveBeenCalled();
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