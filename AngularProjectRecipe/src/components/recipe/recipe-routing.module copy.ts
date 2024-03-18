import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddRecipeComponent} from './add-recipe/add-recipe.component';
import {EditRecipeComponent} from './edit-recipe/edit-recipe.component';
import {SmallRecipeComponent} from './small-recipe/small-recipe.component';
import {RecipeDetailsComponent} from './recipe-details/recipe-details.component';
import {AllRecipesComponent} from './all-recipes/all-recipes.component';
import {Route, RouterModule} from '@angular/router';
import {loginGuard} from '../user/login/login.guard';

const recipe_router: Route[] = [
	{path: '', redirectTo: 'all-recipe', pathMatch: 'full'},
	{path: 'all-recipe', component: AllRecipesComponent},
	{
		path: 'add-recipe',
		component: AddRecipeComponent,
		canActivate: [loginGuard],
	},
	{
		path: 'edit-recipe',
		component: EditRecipeComponent,
		canActivate: [loginGuard],
	},
	{path: 'small-recipe', component: SmallRecipeComponent},
	{
		path: 'recipe-details',
		component: RecipeDetailsComponent,
		canActivate: [loginGuard],
	},
];

@NgModule({
	declarations: [],
	imports: [RouterModule.forChild(recipe_router)],
	exports: [RouterModule],
})
export class RecipeRoutingModule {}
