import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {BlogPost} from './blog-post';
import {BlogPostService} from './blog-post.service';
import {UserService} from './user.service';

@Component({
	selector: 'add-bp',
	templateUrl: 'app/add-bp.component.html',
	styleUrls: ['app/add-bp.component.css']

})

export class AddBPComponent implements OnInit{
	public blogPostModel: BlogPost;	
	public error: string;

	public postToBlog(){
		this.blogPostModel.owner = this._userService.getUserName();
		this.blogPostModel.date = new Date().toLocaleString();

		this._blogPostService.postBlogPost(this.blogPostModel)
		.subscribe( 
			num => {
				console.log("num = " +  num);
			},
			error => this.error = <any> error
		)

		//reset
		//this.blogPostModel = new BlogPost();			

		this._router.navigate(["Redirect", {message: "Adding post..."}]);
	}

	ngOnInit(){
		this.blogPostModel = new BlogPost();	
	}

	constructor(private _blogPostService: BlogPostService, private _userService: UserService,
			   private _router: Router){
	}
}
