import {Component, OnInit} from 'angular2/core';
import {LoginService} from './login.service';
import {UserService} from './user.service';

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
			}
		},
			error => this.error = <any>error
		);
	}

	constructor(private _loginService: LoginService, private _userService: UserService){}

}
