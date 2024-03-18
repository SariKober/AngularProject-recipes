import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import Swal from 'sweetalert2';

@Component({
	selector: 'app-log-out',
	standalone: true,
	imports: [],
	templateUrl: './log-out.component.html',
	styleUrl: './log-out.component.scss',
})
export class LogOutComponent implements OnInit {
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
	) {}
	ngOnInit(): void {
		console.log('logout');
		this.logOut();
	}
	logOut() {
		Swal.fire({
			title: 'האם אתה בטוח שברצונך להתנתק?',
			showCancelButton: true,
			confirmButtonText: 'כן, התנתק',
			cancelButtonText: 'ביטול',
			cancelButtonColor: 'rgb(255, 17, 164)',
			confirmButtonColor: 'rgb(255, 17, 164)',
			reverseButtons: true,
		}).then((result) => {
			if (result.isConfirmed) {
				sessionStorage.clear();
				localStorage.clear();
				this.router.navigate(['../../' + '/recipe']);
			}
			this.router.navigate(['/']);
		});
	}
}
