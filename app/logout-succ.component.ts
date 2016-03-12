import {Component} from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';

@Component({
	selector: 'logout-succ',
	templateUrl: 'app/logout-succ.component.html',
	styleUrls: ['app/logout-succ.component.css']

})

export class LogoutSuccComponent {
	public name;


	constructor(private _router: Router, private _routeParams: RouteParams){
		this.name = _routeParams.params["name"];


		setTimeout(function(){
			let link = ["Login", {message: "Logged out successfully!"}];
			_router.parent.navigate(link);
		}, 1000);

	}


}
