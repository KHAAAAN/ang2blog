import {Component, OnInit} from 'angular2/core';
import {LoginService} from './login.service';
import {UserService} from './user.service';
import { Router } from 'angular2/router';

@Component({
	selector: 'login',
	templateUrl: 'app/login.component.html',
	styleUrls: ['app/login.component.css'],

	providers: [LoginService]
})

export class LoginComponent{
	public username: string;
	public password: string;
	public token: number;
	public error;
	public invalidInfo: boolean;

	public signIn(){
		this._loginService.authenticate(this.username, this.password)
		.subscribe(token => {
			this.token = token;
			console.log("token = " + this.token);

			//token will be 0 if user doesn't exist
			if(token == 0){
				this.invalidInfo = true;	
			}
			else{
				this.invalidInfo = null;
				this._userService.setUserModel(this.username, this.token);
				this.gotoSuccess();	
			}
		},
			error => this.error = <any>error
		);
	}


	public gotoSuccess() {
		/*let link = ['LoginSucc', { name: this.username }];
		this._router.navigate(link);*/

		/*let link = ['LoginSucc'];
		this._router.navigate(link);*/
	   this._router.parent.navigate(['LoginSucc']);
	}

	constructor(private _loginService: LoginService, private _userService: UserService, private _router: Router){}

}
