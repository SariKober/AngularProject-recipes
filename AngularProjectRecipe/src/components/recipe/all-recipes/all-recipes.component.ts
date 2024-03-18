import {Component, OnInit} from '@angular/core';
import {Recipe} from '../../../models/recipe.model';
import {RecipeService} from '../recipe.service';
import {Category} from '../../../models/category.model';
@Component({
	selector: 'app-all-recipes',

	templateUrl: './all-recipes.component.html',
	styleUrl: './all-recipes.component.scss',
})
export class AllRecipesComponent implements OnInit {
	public recipeList: Recipe[] = [];
	public displayRecipeList: Recipe[] = [];
	public category: string = '';
	public categories: Category[] = [];
	public difficulty: number = 0;
	public timePrepering: number = 0;
	public searchName: string = '';
	constructor(private recipeService: RecipeService) {}
	ngOnInit(): void {
		this.recipeService.getRecipes().subscribe({
			next: (res) => {
				this.recipeList = res;
				this.displayRecipeList = res;
			},
		});
		this.recipeService
			.getCategoris()
			.subscribe({next: (res) => (this.categories = res)});
	}
	search() {
		this.displayRecipeList = this.recipeList.filter((x) =>
			x.name.includes(this.searchName),
		);
	}
	onFillter() {
		this.displayRecipeList = this.recipeList.filter((x) => {
			const d = this.difficulty === 0 || x.levelOfDifficulty <= this.difficulty;
			const t =
				this.timePrepering === 0 || x.preparationTime <= this.timePrepering;
			const c = this.category === '' || this.category == x.categoryCode;

			return d && t && c;
		});
	}
}
