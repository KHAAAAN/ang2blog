import {Component} from 'angular2/core';
import {RegisterService}  from './register.service';

@Component({
	selector: 'register',
	templateUrl: 'app/register.component.html',
	styleUrls: ['app/register.component.css'],

	providers: [RegisterService]
})

export class RegisterComponent{
	public username: string;
	public password: string;

	public message: string;
	private _color: string;

	public error;

	public register(){
		this._registerService.register(this.username, this.password)
		.subscribe(exists => {
			//if tuple added successfully and no existing tuple
			
			if(exists == 0){
				this.message = "User " + this.username + " registered!";		
				this._color = "green";
			}	
			else{
				this.message = "User " + this.username + " already exists.";		
				this._color = "red";
			}
			this.username = "";
			this.password = "";
		},
		error => this.error = <any> error
	  );
	}		

	constructor(private _registerService: RegisterService){}
}
