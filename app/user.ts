export class User{
	public name: string;
	//public password: string;
	public permissions = {
		superUser: null as boolean,
		normalUser:	null as boolean		
	}	

	/*constructor(){
		this.permissions = { superUser: false, normalUser: false }
	}*/
}
