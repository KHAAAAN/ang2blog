import {Component, OnInit} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

import {BlogPost, BlogComment} from './blog-post';
import {BlogPostService} from './blog-post.service';

import {User} from './user';
import {UserService} from './user.service';

import {Router} from 'angular2/router';

@Component({
	selector: 'blog-post',
	templateUrl: 'app/blog-post.component.html',
	styleUrls: ['app/blog-post.component.css'],

	inputs:['blogPostModel', 'userModel']
})

export class BlogPostComponent implements OnInit{
	public userModel: User;
	public blogPostModel: BlogPost;
	public savedBody: string;

	public canEdit: boolean = false;		

	public canEditComment: boolean[] = [];
	public savedComment: string[] = [];

	public error: string;
	public success: number;

	public showComments: boolean = false;
	public currentComment: string;
	
	constructor(private _blogPostService: BlogPostService, private _router: Router){
	}	

	ngOnInit(){
		for(var i = 0; i < this.blogPostModel.comments.length; ++i){
			this.canEditComment[i] = false;
			this.savedComment[i] = this.blogPostModel.comments[i].text;
		}

	}

	public deletePost(){
		this._blogPostService.deletePost(this.blogPostModel.owner, this.blogPostModel.date)
		.subscribe(success => {this.success = success; this._router.navigate(["Redirect", {message: "Deleting post..."}]); },
				  error => this.error = error); 
	}

	public updatePost(msg){
		this._blogPostService.updatePost(this.blogPostModel.owner, this.blogPostModel. date,
									  this.blogPostModel)
		.subscribe(success => {this.success = success; this._router.navigate(["Redirect", {message: msg}]); },
				  error => this.error = error); 
	}

	public editPost(){
		this.savedBody = this.blogPostModel.body;
		this.canEdit = true;	
	}

	public savePost(){
		this.updatePost("Saving post...");
		this.canEdit = false;
	}

	public cancel(){
		this.blogPostModel.body = this.savedBody;
		this.canEdit = false;
	}

	public saveCommentEdit(i: number){
		this._blogPostService.updatePost(this.blogPostModel.owner, this.blogPostModel. date,
									  this.blogPostModel)
		.subscribe(success => {this.success = success;},
				  error => this.error = error); 

		this.savedComment[i] = this.blogPostModel.comments[i].text;
		this.canEditComment[i] = false;
	}

	public cancelCommentEdit(i: number){
		this.blogPostModel.body = this.savedComment[i];
		this.canEditComment[i] = false;
	}

	public loadComments(){
		this.showComments = true;
	}

	public unloadComments(){
		this.showComments = false;
	}

	public submitComment(){
		this.blogPostModel.comments.unshift(new BlogComment(this.userModel.name,
												  new Date().toLocaleString(),
												  this.currentComment));

		this._blogPostService.updatePost(this.blogPostModel.owner, this.blogPostModel. date,
									  this.blogPostModel)
		.subscribe(success => {this.success = success;},
				  error => this.error = error); 

		this.currentComment = "";
		this.loadComments();

	}
	
	public deleteComment(owner: string, date: string){

		for(var i = 0; i < this.blogPostModel.comments.length; ++i){
			if(this.blogPostModel.comments[i].owner == owner &&
			   this.blogPostModel.comments[i].date == date){
				
				this.blogPostModel.comments.splice(i, 1);
				this._blogPostService.updatePost(this.blogPostModel.owner, this.blogPostModel. date,
											  this.blogPostModel)
				.subscribe(success => {this.success = success;},
						  error => this.error = error); 
				break;
			}
		}
		
	}

	public editComment(i){
		this.canEditComment[i] = true;
	}

	public goToLogin(){
		this._router.navigate(["Login"]);
	}
}
