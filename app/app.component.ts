import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {RouteConfig, ROUTER_PROVIDERS} from 'angular2/router';

import {NavbarComponent} from './navbar.component';
import {RegisterComponent} from './register.component';
import {HomeComponent} from './home.component';

import{LoginComponent} from './login.component';
import {LoginSuccComponent} from './login-succ.component';
import {LogoutSuccComponent} from './logout-succ.component';

import {UserService} from './user.service';

import {AddBPComponent} from './add-bp.component';

import {BlogPostService} from './blog-post.service';

@Component({
    selector: 'app',
    templateUrl: 'app/app.component.html',
	styleUrls: ['app/app.component.css'],

	directives: [NavbarComponent],

	providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS, UserService, BlogPostService]
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
	},


	{
		path: '/logout_successful',
		name: 'LogoutSucc',
		component: LogoutSuccComponent
	},

	{
		path: '/add_blog_post',
		name: 'AddBP',
		component: AddBPComponent
	}	
])

export class AppComponent { 
}
