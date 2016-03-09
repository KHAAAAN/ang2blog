import {Component} from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';

@Component({
	selector: 'login-succ',
	templateUrl: 'app/login-succ.component.html',
	styleUrls: ['app/login-succ.component.css']//,

	//inputs: ['name']
})

export class LoginSuccComponent{
	public name;

	constructor(_router: Router){}
}
