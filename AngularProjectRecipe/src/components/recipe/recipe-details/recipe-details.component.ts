import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Recipe} from '../../../models/recipe.model';
import {RecipeService} from '../recipe.service';
import {LoginServiceService} from '../../user/login-service.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-recipe-details',

	templateUrl: './recipe-details.component.html',
	styleUrl: './recipe-details.component.scss',
})
export class RecipeDetailsComponent implements OnInit {
	idRecipe!: string;
	recipe!: Recipe;
	date!: string;
	public isUserAddeed: Boolean = false;
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private userService: LoginServiceService,
		private recipeService: RecipeService,
	) {}
	ngOnInit(): void {
		console.log('details');
		this.activatedRoute.queryParams.subscribe(
			(params) => (this.idRecipe = params['code']),
		);
		this.recipeService.getRecipe(this.idRecipe).subscribe({
			next: (resRecipe) => {
				this.recipe = resRecipe;
				console.log('succseed', resRecipe);
				this.userService.getUser(this.recipe.userCodeAdded).subscribe({
					next: (resUser) => {
						if (
							resUser.name === sessionStorage.getItem('userName') &&
							resUser.password === sessionStorage.getItem('userPassword')
						) {
							this.isUserAddeed = true;
							console.log(true);
						}
					},
				});
			},
			error: (error) => {
				console.log('error');
			},
		});
	}
	dleteRecipe() {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success',
				cancelButton: 'btn btn-danger',
			},
			buttonsStyling: false,
		});
		swalWithBootstrapButtons
			.fire({
				title: 'האם אתה בטוח?',
				text: 'לא תוכל לשחזר את זה!',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'כן, מחק את זה!',
				cancelButtonText: 'לא, בטל!',
				reverseButtons: true,
			})
			.then((result) => {
				if (result.isConfirmed) {
					this.recipeService.deleteRecipe(this.recipe.code).subscribe({
						next: (res) => {
							swalWithBootstrapButtons.fire({
								title: 'נמחק!',
								text: 'המתכון נמחק בהצלחה.',
								icon: 'success',
							});
							console.log('delete');
						},
						error: (error) => {
							console.log('error');
						},
					});
				} else if (result.dismiss === Swal.DismissReason.cancel) {
					swalWithBootstrapButtons.fire({
						title: 'Cancelled',
						text: 'Your imaginary file is safe :)',
						icon: 'error',
					});
				}
			});
	}
	toEditRecipe() {
		this.router.navigate(['../' + '/edit-recipe'], {
			relativeTo: this.activatedRoute,
			queryParams: {code: this.recipe.code},
		});
	}
}
