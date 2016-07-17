import { Observable } from 'rx';


export default class Controller {

    /* @ngInject */
    constructor(dataService) {
        this.dataService = dataService;
        this.list = [];
        this.newItem = {};
        this.updateData();
        this.lastId = 0;
        this.subscribeToRealTime();
    }

    updateData() {
        this.data = this.dataService.read();
    }

    subscribeToRealTime() {
        this.dataService.readRealTimeUpdates().subscribe((data) => {
            this.realTimeData = data;
        });
    }

    removeItem(itemId) {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].id == itemId) {
                this.list.splice(i, 1);
            }
        }
    }

    addItem() {
        if (this.newItem.name) {
            this.newItem.id = this.lastId++;
            this.list.push(this.newItem);
            this.newItem = {};
        }
    }




}