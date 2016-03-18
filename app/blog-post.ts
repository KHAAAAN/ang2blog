export class BlogPost {
	public header: string;
	public body: string;
	public owner: string;

	public date: string;
	//public comments: string[];
	public comments: BlogComment[]; 

	constructor(){
		this.comments = [];
	}
}

export class BlogComment {
	public owner: string;
	public date: string;

	public text: string;

	constructor(owner: string, date: string, text: string){
		this.owner = owner;
		this.date = date;

		this.text = text;

	}
}
