import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from './../models/user.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class LoginServiceService {
	constructor(private http: HttpClient) {}

	getUsers(): Observable<User[]> {
		return this.http.get<User[]>('https://localhost:7208/api/User');
	}
	//  addProduct( value){
	//    this.http.post<('/api/Prodact')
	//    }

	public addUser(u: User): Observable<User[]> {
		// this.products.push(p)
		// return this.http.post<Product[]>('https://localhost:7206/api/Prodact', p)
		console.log(u);

		return this.http.post<User[]>('/api/User', u);
	}
}
