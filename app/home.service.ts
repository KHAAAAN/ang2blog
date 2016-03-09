import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HomeService {
	constructor (private http: Http) {}

	private _locationUrl = 'http://localhost:3000/app/images/pics.json';

	getImages () {
		return this.http.get(this._locationUrl)
		.map(res => <string[]> res.json().data)
		.do(data => console.log(data))
		.catch(this.handleError);
	}

	private handleError (error: Response) {
		console.log("errors4days")
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}
