import {Component} from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';

@Component({
	selector: 'comments-page',
	templateUrl: 'app/comments-page.component.html',
	styleUrls: ['app/comments-page.component.css']

})

export class CommentsPageComponent {
	public comments;


	constructor(private _router: Router, private _routeParams: RouteParams){
		console.log(_routeParams);	
	}

	public goBack(){	
			this._router.navigate(["Home"]);
	}

}

