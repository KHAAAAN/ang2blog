import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {RouteConfig, ROUTER_PROVIDERS} from 'angular2/router';

import {NavbarComponent} from './navbar.component';
import{LoginComponent} from './login.component';
import {RegisterComponent} from './register.component';
import {HomeComponent} from './home.component';
import {LoginSuccComponent} from './login-succ.component';

import {UserService} from './user.service';

@Component({
    selector: 'app',
    templateUrl: 'app/app.component.html',
	styleUrls: ['app/app.component.css'],

	directives: [NavbarComponent],

	providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS, UserService]
})

@RouteConfig([
	{
		path: '/login', name: 'Login',
		component: LoginComponent
	},
	
	{
		path: '/register',
		name: 'Register',
		component: RegisterComponent
	},

	{
		path: '/home',
		name: 'Home',
		component: HomeComponent,
		useAsDefault: true
	},

	{
		path: '/login_successful',
		name: 'LoginSucc',
		component: LoginSuccComponent
	}	
])

export class AppComponent { 
}
