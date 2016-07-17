import { Observable } from 'rx';


export default class Controller {

    /* @ngInject */
    constructor(dataService) {
        this.dataService = dataService;
        this.list = [{ name: 'Bird' }, { name: 'Elephant' }];
        this.newItem = {};
        this.data = dataService.read();
        this.subscribeToRealTime();
    }

    subscribeToRealTime() {
        this.dataService.readRealTimeUpdates().subscribe((data) => {
            this.realTimeData = data;
        });
    }

    addItem() {
        if (this.newItem.name) {
            this.list.push(this.newItem);
            this.newItem = {};
        }
    }
}