import {Component} from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';

@Component({
	selector: 'login-succ',
	templateUrl: 'app/login-succ.component.html',
	styleUrls: ['app/login-succ.component.css']

})

export class LoginSuccComponent {
	public name;


	constructor(private _router: Router, private _routeParams: RouteParams){
		console.log(_routeParams);	
		this.name = _routeParams.params["name"];

		setTimeout(function(){
			_router.parent.navigate(["Home"]);
		}, 1000);

	}

	public goHome(){	
			this._router.parent.navigate(["Home"]);
	}

}
