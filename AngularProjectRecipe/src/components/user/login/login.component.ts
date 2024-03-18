import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginServiceService} from '../login-service.service';
import {User} from '../../../models/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
	public loginUser!: FormGroup;
	public notCorrectPassword: boolean = false;
	public isClickSignUp: boolean = false;
	public name: string = '';
	public password: string = '';
	public users: User[] = [];
	constructor(
		private router: Router,
		private loginService: LoginServiceService,
		private activatedRoute: ActivatedRoute,
	) {}
	ngOnInit(): void {
		this.loginUser = new FormGroup({
			name: new FormControl('', [Validators.required, Validators.minLength(2)]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(6),
			]),
		});
		this.loginService.getUsers().subscribe({
			next: (res) => {
				this.users = res;
				console.log('succseed');
			},
			error: (error) => {
				console.log('error');
			},
		});
	}

	submit() {
		let user = this.users.find(
			(x) =>
				x.name == this.loginUser.get('name')?.value &&
				x.password == this.loginUser.get('password')?.value,
		);
		if (user != undefined) {
			localStorage.setItem('isLogin', 'true');
			sessionStorage.setItem('userName', this.loginUser.get('name')?.value);
			sessionStorage.setItem(
				'userPassword',
				this.loginUser.get('password')?.value,
			);
			this.router.navigate(['../../' + '/recipe/'], {
				relativeTo: this.activatedRoute,
			});
		} else {
			user = this.users.find(
				(x) => x.name == this.loginUser.get('name')?.value,
			);
			if (user != undefined) this.notCorrectPassword = true;
			else {
				this.toSignUp();
			}
		}
	}

	toSignUp() {
		this.router.navigate(['../' + '/register'], {
			relativeTo: this.activatedRoute,
			queryParams: {name: this.loginUser.get('name')?.value},
		});
	}
}
