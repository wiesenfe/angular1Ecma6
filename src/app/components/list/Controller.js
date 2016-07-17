import { Observable } from 'rx';


export default class Controller {

    /* @ngInject */
    constructor(dataService,$scope) {
        this.dataService = dataService;
        this.list = [];
        this.newItem = {};
        this.lastId = 0;
        this.$scope= $scope;
        this.subscribeToRealTime();
    }

    updateData() {
        this.dataService.read().subscribe((response) => {
            this.data =  response.data.foo;
        }, (err) => {
            console.error(`Error ${err}`);
        });
    }
    
    subscribeToRealTime() {
        this.dataService.readRealTimeUpdates().subscribe((data) => {
            this.realTimeData = data;
            this.$scope.$digest();
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