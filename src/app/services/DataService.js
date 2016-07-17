import { BehaviorSubject } from 'rx';

export default class DataService {

    /* @ngInject */
    constructor($interval) {
        console.log("Constructed");
        this.realTimeStream = new BehaviorSubject(0);
        $interval(() => {
            this.realTimeStream.onNext(this._random());
        }, 1000);
    }

    read() {
        return this._random() + "%";
    }

    readRealTimeUpdates() {
        return this.realTimeStream;
    }

    _random() {
        let value = Math.random();
        return Math.floor(value * 100);
    }
}
