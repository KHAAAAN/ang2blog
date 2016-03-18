import {Component} from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';

@Component({
	selector: 'redirect',
	templateUrl: 'app/redirect.component.html',
	styleUrls: ['app/redirect.component.css']

})

export class RedirectComponent {
	public message;


	constructor(private _router: Router, private _routeParams: RouteParams){
		console.log(_routeParams);	
		this.message = _routeParams.params["message"];

		setTimeout(function(){
			_router.parent.navigate(["Home"]);
		}, 1000);

	}

}
