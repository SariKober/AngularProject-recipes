import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user.model';
import {LoginServiceService} from '../login-service.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-register',

	templateUrl: './register.component.html',
	styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private loginService: LoginServiceService,
	) {}
	public users: User[] = [];
	public addUser!: FormGroup;

	public isClickSignUp: boolean = true;
	signUp() {
		let u: User = this.addUser.value;
		let user = this.users.find(
			(x) => x.name == u.name && x.password == u.password,
		);
		if (user != undefined) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'User is already registered in the system',
			});
		} else {
			this.loginService.addUser(u).subscribe({
				next: (res) => {
					localStorage.setItem('isLogin', 'true');
					sessionStorage.setItem('userName', this.addUser.get('name')?.value);
					sessionStorage.setItem(
						'userPassword',
						this.addUser.get('password')?.value,
					);
					this.router.navigate(['../../' + '/recipe/'], {
						relativeTo: this.route,
					});
				},
				error: (error) => {
					console.log(error);
				},
			});
		}
	}
	ngOnInit(): void {
		{
			this.addUser = new FormGroup({
				name: new FormControl('', [
					Validators.required,
					Validators.minLength(2),
				]),
				password: new FormControl('', [
					Validators.required,
					Validators.minLength(3),
				]),
				address: new FormControl('', [Validators.required]),
				code: new FormControl('0'),
				email: new FormControl('', [Validators.required, Validators.email]),
			});
			this.route.queryParams.subscribe((params) => {
				this.addUser.get('name')?.setValue(params['name']);
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
	}
	toLogin() {
		console.log('ok');
		this.router.navigate(['../'], {
			relativeTo: this.route,
		});
	}
}
