import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddRecipeComponent} from './add-recipe/add-recipe.component';
import {EditRecipeComponent} from './edit-recipe/edit-recipe.component';
import {SmallRecipeComponent} from './small-recipe/small-recipe.component';
import {RecipeDetailsComponent} from './recipe-details/recipe-details.component';
import {RecipeRoutingModule} from './recipe-routing.module copy';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DurationPipe} from './duration.pipe';
import {StarLevelPipe} from './star-level.pipe';
import {AllRecipesComponent} from './all-recipes/all-recipes.component';

@NgModule({
	declarations: [
		AddRecipeComponent,
		EditRecipeComponent,
		SmallRecipeComponent,
		RecipeDetailsComponent,
		AllRecipesComponent,
	],
	imports: [
		CommonModule,
		RecipeRoutingModule,
		ReactiveFormsModule,
		DurationPipe,
		StarLevelPipe,
		FormsModule,
	],
	exports: [AllRecipesComponent],
})
export class RecipeModule {}
