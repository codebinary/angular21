//Observable Version
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observavle';

//Librería que permite mapear los datos que recogemos de las peticiones ajax
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService{

	public url = "https://festivaldelima.com/2016/appfest/api/v1";

	//Constructor
	constructor(private http: Http){

	}

	login(user_to_login:Object){
		console.log(user_to_login);
		let json = JSON.stringify(user_to_login);
		let params = "json="+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this.http.post(this.url+"/login", params, {headers: headers})
				.map(res => res.json());
	}


	//Salir (Logout)
	logout(){
		//Remove user from local storage to log user out 
		localStorage.removeItem('token');
	}

}