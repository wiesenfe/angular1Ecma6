import { Observable, AsyncSubject } from 'rx';

export default class DataService {

    /* @ngInject */
    constructor($http) {
        this.http = $http;
    }

    read() {
        let subject = new AsyncSubject();
        this.http.get('/rest/foo.json').then((response)=>{
            subject.onNext(response);
            subject.onCompleted();
        },(error) => {
            subject.onError(error);
        });
        return subject;
    }

    readRealTimeUpdates() {
        return new Observable.interval(1000);
    }
}
