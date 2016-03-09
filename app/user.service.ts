import {Injectable, OnInit} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {User} from './user';

@Injectable()
export class UserService {
	//we need a wrapper to reference
	public userModelWrapper = {
		userModel: null as User
	}

	public setUserModel(name: string, token: number){
		var userModel: User = new User();
		userModel.name = name;	

		userModel.permissions["normalUser"] = true;
		if(token == 1){
			userModel.permissions["superUser"] = true;
		}

		this.userModelWrapper["userModel"] = userModel;	
	}
	
}
