import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import{LoginComponent} from './login.component';
import{RegisterComponent} from './register.component';
import {HomeComponent} from './home.component';

import {User} from './user';
import {UserService} from './user.service';

@Component({
	selector: 'navbar',
	templateUrl: 'app/navbar.component.html',
	styleUrls: ['app/navbar.component.css'],
	directives: [ROUTER_DIRECTIVES]
})


export class NavbarComponent {	
	constructor (private _userService : UserService, private _router : Router){	
		//when ready to set this.userModel, it will do so
		this._userService.user$.subscribe(userModel => { this.userModel = userModel[0]; } );
	}

	public userModel: User;

	public logOut(){
		var name = this.userModel.name;
		this._userService.unloadUser();

		let link = ["LogoutSucc", {name: name}]
		this._router.navigate(link);
	}
}
