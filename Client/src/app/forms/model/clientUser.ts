export interface ClientUser {
	id:number;
	firstname: string;
	lastname: string;
	// middlename:string;
	// sex:string;
	// status:string;
	// department:string;
	// commencing:string;
	// eduaction:string;
	// directExpriance:string;
	// level:string;
	// independentExpriance:string;
	// service:string;
	// crt:string;
	// username: string;
	email: string;
	password?:string;
	token?:string
}
