import {Component, OnInit} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

import {User} from './user';
import {UserService} from './user.service';

import {FrontContentComponent} from './front-content.component';

import {BlogPost} from './blog-post';
import {BlogPostService} from './blog-post.service';
import {BlogPostComponent} from './blog-post.component';

//import {Router} from 'angular2/router';

@Component({
	selector: 'home',
	templateUrl: 'app/home.component.html',
	styleUrls: ['app/home.component.css'],

	directives: [FrontContentComponent, BlogPostComponent]

})

export class HomeComponent{
	public userModel: User;	
	public blogPosts: BlogPost[];

	public error: string;

	constructor (private _userService : UserService, private _blogPostService: BlogPostService){		
		//when ready to set this.userModel, it will do so
		this._userService.user$.subscribe(userModel => { 
			this.userModel = userModel[0];

			console.log("inside of home.component.ts");
			console.log(this.userModel);


		} );

		//this is REALLY important
		this._userService.loadUser();

		this._blogPostService.getAllBlogPosts()
		.subscribe( blogPosts => {this.blogPosts = blogPosts; console.log(this.blogPosts)},
				   error => this.error = error);
	}


}
