import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../models/user.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class LoginServiceService {
	constructor(private http: HttpClient) {}

	getUsers(): Observable<User[]> {
		return this.http.get<User[]>('https://localhost:7208/api/User');
	}

	getUser(id: string): Observable<User> {
		return this.http.get<User>('https://localhost:7208/api/User/' + id);
	}
	public addUser(u: User): Observable<User[]> {
		return this.http.post<User[]>('https://localhost:7208/api/User', u);
	}
}
