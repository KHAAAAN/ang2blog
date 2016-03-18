import {Injectable, OnInit} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {User} from './user';

import 'rxjs/add/operator/share'; //for sharing Observable stream
import {CookieService} from 'angular2-cookie/core';

@Injectable()
export class UserService {

	private userModel: User;
	private _userObserver: any;
	private _dataStore: {
			users: Array<User>
		};
	
	public user$: Observable<Array<User>>;


	public setUserModel(name: string, token: number){
		this.userModel = new User();
		this.userModel.name = name;	

		this.userModel.permissions["normalUser"] = true;
		if(token == 1){
			this.userModel.permissions["superUser"] = true;
		}

		this.loadUser();

	}

	loadUser(){
		this._dataStore.users = [this.userModel];

		//push datastore.users into rx stream
		this._userObserver.next(this._dataStore.users);
	}

	unloadUser(){
		this.userModel = null;
		this._dataStore.users = [null];

		//push datastore.users into rx stream
		this._userObserver.next(this._dataStore.users);

		//remove cookies
		this._cookieService.removeAll();
	}

	//for adding post
	public getUserName(){
		return this.userModel.name;
	}

	constructor(private _cookieService: CookieService){

		this.user$ = new Observable(observer => {
				 this._userObserver = observer;

				var username = this._cookieService.get('username');
				var token = this._cookieService.get('token');

				if(username !== undefined && token !== undefined){
					this.setUserModel(username, token);
				}

		}).share();
		
		this._dataStore = { users: [] };
	}	
}
