import {Injectable} from 'angular2/core';
import {Http, Response, URLSearchParams} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService {
	constructor (private http: Http) {}

	private _locationUrl = 'http://localhost:3000/login_attempt';

	authenticate (username: string, password: string) {
		let params: URLSearchParams = new URLSearchParams();
		params.set('username', username);
		params.set('password', password);

		return this.http.get(this._locationUrl, {search: params})
		.map(res => <number> res.json().data)
		.do(() => console.log("LoginService: Success"))
		.catch(this.handleError);
	}

	private handleError (error: Response) {
		console.log("errors4days")
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}
