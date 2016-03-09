import {Component} from 'angular2/core';

@Component({
	selector: 'login',
	templateUrl: 'app/login.component.html',
	styleUrls: ['app/login.component.css']
})

export class LoginComponent{
	public username: string;
	public password: string;
}
