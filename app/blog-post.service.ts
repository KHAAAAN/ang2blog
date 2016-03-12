import {Injectable} from 'angular2/core';
import {Http, Response, URLSearchParams} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {BlogPost} from './blog-post';

@Injectable()
export class BlogPostService {
	constructor (private http: Http) {}


	private _locationUrls = [
		'http://localhost:3000/get_blog_posts',
		'http://localhost:3000/attempt_to_add_blog_post',
		'http://localhost:3000/attempt_to_delete_blog_post'
	]

	getAllBlogPosts () {
		return this.http.get(this._locationUrls[0])
		.map(res => <BlogPost[]> res.json().data)
		.do(res => console.log(res))
		.catch(this.handleError);
	}

	postBlogPost (blogPost: BlogPost) {
		let params: URLSearchParams = new URLSearchParams();
		params.set('owner', blogPost.owner);
		params.set('date', blogPost.date);
		params.set('blogPost', JSON.stringify(blogPost));

		return this.http.get(this._locationUrls[1], {search: params})
		.map(res => <number> res.json().data)
		.do(() => console.log("postBlogPost: Success"))
		.catch(this.handleError);
	}

	deletePost(owner: string, date: string){
		let params: URLSearchParams = new URLSearchParams();
		params.set('owner', owner);
		params.set('date', date);

		return this.http.get(this._locationUrls[2], {search: params})
		.map(res => <number> res.json().data)
		.do(() => console.log("deleteBlogPost: Success"))
		.catch(this.handleError);
			
	}

	private handleError (error: Response) {
		console.log("errors4days")
		return Observable.throw(error.json().error || 'Server error');
	}
}
