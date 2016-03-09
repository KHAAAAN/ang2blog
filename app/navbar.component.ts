import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import{LoginComponent} from './login.component';
import{RegisterComponent} from './register.component';
import {HomeComponent} from './home.component';

@Component({
	selector: 'navbar',
	templateUrl: 'app/navbar.component.html',
	styleUrls: ['app/navbar.component.css'],
	directives: [ROUTER_DIRECTIVES]
})


export class NavbarComponent {	
}
