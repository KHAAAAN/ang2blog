import {Component, OnInit} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {FrontContentComponent} from './front-content.component';
import {User} from './user';

@Component({
	selector: 'home',
	templateUrl: 'app/home.component.html',
	styleUrls: ['app/home.component.css'],

	directives: [FrontContentComponent]

})

export class HomeComponent{
	public userModel: User;	
	/*ngOnInit(){

	}*/

}
