import {Component, OnInit, Output} from '@angular/core';
import {
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import {Recipe} from '../../../models/recipe.model';
import {RecipeService} from '../recipe.service';
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {Category} from '../../../models/category.model';

@Component({
	selector: 'app-edit-recipe',
	templateUrl: './edit-recipe.component.html',
	styleUrl: './edit-recipe.component.scss',
})
export class EditRecipeComponent implements OnInit {
	public recipe!: Recipe;
	id!: string;
	public categories: Category[] = [];
	public editRecipeForm!: FormGroup;
	ngOnInit(): void {
		this.route.queryParams.subscribe((params) => {
			this.id = params['code'];
		});
		this.recipeService.getRecipe(this.id).subscribe({
			next: (res) => {
				this.recipe = res;
				console.log(this.recipe);
				this.editRecipeForm = new FormGroup({
					code: new FormControl(this.recipe?.code, [
						Validators.required,
						Validators.minLength(2),
					]),
					name: new FormControl(this.recipe?.name, [
						Validators.required,
						Validators.minLength(2),
					]),
					categoryCode: new FormControl(this.recipe?.categoryCode, [
						Validators.required,
						Validators.minLength(3),
					]),
					preparationTime: new FormControl(this.recipe?.preparationTime, [
						Validators.required,
					]),
					levelOfDifficulty: new FormControl(this.recipe?.levelOfDifficulty, [
						Validators.required,
					]),
					dateAdded: new FormControl(this.recipe?.dateAdded, [
						Validators.required,
					]),
					listOfComponents: this.formBuilder.array(
						this.recipe?.listOfComponents,
						[],
					),
					preparation: this.formBuilder.array(this.recipe?.preparation, []),
					userCodeAdded: new FormControl(this.recipe?.userCodeAdded, [
						Validators.required,
					]),
					image: new FormControl(this.recipe?.image, [Validators.required]),
				});
			},
		});
		this.recipeService
			.getCategoris()
			.subscribe({next: (res) => (this.categories = res)});
	}
	inputFields: string[] = [''];
	addInputField(event: KeyboardEvent): void {
		if (event.key === 'Enter') this.inputFields.push('');
	}
	constructor(
		private formBuilder: FormBuilder,
		private recipeService: RecipeService,
		private router: Router,
		private route: ActivatedRoute,
	) {}

	addItem(): void {
		const last = (this.editRecipeForm.get('listOfComponents') as FormArray).at(
			(this.editRecipeForm.get('listOfComponents') as FormArray).length - 1,
		);
		if (last?.value !== '') {
			(this.editRecipeForm.get('listOfComponents') as FormArray).push(
				new FormControl(''),
			);
		}
	}

	removeItem(index: number): void {
		if (index === 0) return;
		(this.editRecipeForm.get('listOfComponents') as FormArray).removeAt(index);
	}
	get listOfComponentsArray(): FormArray {
		return this.editRecipeForm?.get('listOfComponents') as FormArray;
	}
	get preparationArray(): FormArray {
		return this.editRecipeForm?.get('preparation') as FormArray;
	}

	addListOfComponents(): void {
		(this.editRecipeForm?.get('listOfComponents') as FormArray).push(
			this.formBuilder.control(''),
		);
	}

	removeListOfComponents(): void {
		(this.editRecipeForm?.get('listOfComponents') as FormArray).removeAt(
			(this.editRecipeForm?.get('listOfComponents') as FormArray).length - 1,
		);
	}

	addPreparation(): void {
		(this.editRecipeForm?.get('preparation') as FormArray).push(
			this.formBuilder.control(''),
		);
	}

	removePreparation(): void {
		(this.editRecipeForm?.get('preparation') as FormArray).removeAt(
			(this.editRecipeForm?.get('preparation') as FormArray).length - 1,
		);
	}

	onSave(): void {
		console.log(this.editRecipeForm.value);
		let r: Recipe = this.editRecipeForm.value;
		console.log(r.categoryCode);
		Swal.fire({
			title: 'האם אתה רוצה לשמור שינויים?',
			showDenyButton: true,
			showCancelButton: true,
			confirmButtonText: 'שמור',
			denyButtonText: `אל תשמור`,
		}).then((result) => {
			if (result.isConfirmed) {
				this.recipeService
					.putRecipe(this.recipe.code, this.editRecipeForm.value)
					.subscribe({
						next: (res) => {
							console.log('ok');
							Swal.fire('נשמר!', '', 'success');
							this.router.navigate(['../'], {relativeTo: this.route});
						},
						error: (res) => {
							console.log(res);
						},
					});
			} else if (result.isDenied) {
				Swal.fire('השינויים לא נשמרו', '', 'info');
			}
		});
	}
}
