export class BlogPost {
	public header: string;
	public body: string;
	public owner: string;

	public date: string;
	public comments: string[];

	constructor(){
		this.comments = [];
	}
}
