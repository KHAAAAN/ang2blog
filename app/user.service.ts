import {Injectable, OnInit} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {User} from './user';

import 'rxjs/add/operator/share';

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

	constructor(){
		this.user$	= new Observable(observer => {
										 this._userObserver = observer;
		}).share();
		
		this._dataStore = { users: [] };
	}
	
}
