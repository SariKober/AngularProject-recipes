import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../../models/recipe.model';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginServiceService} from '../../user/login-service.service';
import {RecipeService} from '../recipe.service';
@Component({
	selector: 'app-small-recipe',

	templateUrl: './small-recipe.component.html',
	styleUrl: './small-recipe.component.scss',
})
export class SmallRecipeComponent implements OnInit {
	@Input()
	public recipe!: Recipe;
	public isUserAddeed: Boolean = false;
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private userService: LoginServiceService,
		private recipeService: RecipeService,
	) {}
	ngOnInit(): void {
		this.userService.getUser(this.recipe.userCodeAdded).subscribe({
			next: (res) => {
				if (
					res?.name === sessionStorage.getItem('userName') &&
					res?.password === sessionStorage.getItem('userPassword')
				)
					this.isUserAddeed = true;
			},
		});
	}
	toRecipeDetails() {
		this.router.navigate(['../' + '/recipe-details'], {
			relativeTo: this.activatedRoute,
			queryParams: {code: this.recipe.code},
		});
	}
}
