import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

import {BlogPost} from './blog-post';
import {BlogPostService} from './blog-post.service';

import {User} from './user';
import {UserService} from './user.service';

@Component({
	selector: 'blog-post',
	templateUrl: 'app/blog-post.component.html',
	styleUrls: ['app/blog-post.component.css'],

	inputs:['userModel', 'blogPostModel']
})

export class BlogPostComponent{
	public userModel: User;	
	public blogPostModel: BlogPost;

}
