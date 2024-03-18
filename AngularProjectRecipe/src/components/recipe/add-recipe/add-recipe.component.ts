import {Component, OnInit} from '@angular/core';
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
import {User} from '../../../models/user.model';
import {LoginServiceService} from '../../user/login-service.service';
import {Category} from '../../../models/category.model';
@Component({
	selector: 'app-add-recipe',
	templateUrl: './add-recipe.component.html',
	styleUrl: './add-recipe.component.scss',
})
export class AddRecipeComponent implements OnInit {
	public categories: Category[] = [];
	public users: User[] = [];
	public addRecipeForm!: FormGroup;
	public code: string = '-1';
	public user: User | undefined;
	constructor(
		private formBuilder: FormBuilder,
		private recipeService: RecipeService,
		private router: Router,
		private route: ActivatedRoute,
		private LoginService: LoginServiceService,
	) {}
	async ngOnInit(): Promise<void> {
		await this.LoginService.getUsers().subscribe({
			next: (res) => {
				console.log('fun');
				this.users = res;
				let user1;
				for (let i = 0; i < res.length; i++) {
					const x = res[i];
					if (
						x.name === sessionStorage.getItem('userName') &&
						x.password === sessionStorage.getItem('userPassword')
					) {
						user1 = x;
						break;
					}
				}
				if (user1 != undefined) {
					this.code = user1.code;
				}
				this.addRecipeForm = new FormGroup({
					code: new FormControl('0', [
						Validators.required,
						Validators.minLength(2),
					]),
					name: new FormControl('', [
						Validators.required,
						Validators.minLength(2),
					]),
					categoryCode: new FormControl('', [
						Validators.required,
						Validators.minLength(3),
					]),
					preparationTime: new FormControl(0, [Validators.required]),
					levelOfDifficulty: new FormControl('', [Validators.required]),
					dateAdded: new FormControl(new Date(), [Validators.required]),
					listOfComponents: this.formBuilder.array([]),
					preparation: this.formBuilder.array([]),
					userCodeAdded: new FormControl(this.code),
					image: new FormControl('', [Validators.required]),
				});
			},
		});
		this.recipeService
			.getCategoris()
			.subscribe({next: (res) => (this.categories = res)});
	}
	inputFields: string[] = ['', '']; // Initial input field
	addInputField(event: KeyboardEvent): void {
		if (event.key === 'Enter') this.inputFields.push(''); // Add a new input field
	}
	get listOfComponentsArray(): FormArray {
		return this.addRecipeForm?.get('listOfComponents') as FormArray;
	}
	get preparationArray(): FormArray {
		return this.addRecipeForm?.get('preparation') as FormArray;
	}
	addListOfComponents(): void {
		(this.addRecipeForm?.get('listOfComponents') as FormArray).push(
			this.formBuilder.control(''),
		);
	}
	removeListOfComponents(): void {
		(this.addRecipeForm?.get('listOfComponents') as FormArray).removeAt(
			(this.addRecipeForm?.get('listOfComponents') as FormArray).length - 1,
		);
	}
	addPreparation(): void {
		(this.addRecipeForm?.get('preparation') as FormArray).push(
			this.formBuilder.control(''),
		);
	}
	removePreparation(): void {
		(this.addRecipeForm?.get('preparation') as FormArray).removeAt(
			(this.addRecipeForm?.get('preparation') as FormArray).length - 1,
		);
	}
	onSave(): void {
		let r: Recipe = this.addRecipeForm.value;
		console.log(this.addRecipeForm.value);
		console.log(r.categoryCode);
		this.recipeService.addRecipe(r).subscribe({
			next: (res) => {
				console.log('succeed');
				Swal.fire({
					title: 'המתכון נוסף בהצלחה!',
					icon: 'success',
				});
				this.router.navigate(['../'], {relativeTo: this.route});
			},
			error: (res) => {
				console.log('error');
			},
		});
	}
}
