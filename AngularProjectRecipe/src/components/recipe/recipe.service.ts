import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Recipe} from '../../models/recipe.model';
import {Category} from '../../models/category.model';

@Injectable({
	providedIn: 'root',
})
export class RecipeService {
	constructor(private http: HttpClient) {}

	getRecipes(): Observable<Recipe[]> {
		return this.http.get<Recipe[]>('https://localhost:7208/api/Recipe');
	}
	getRecipe(id: string): Observable<Recipe> {
		return this.http.get<Recipe>('https://localhost:7208/api/Recipe/' + id);
	}
	public addRecipe(r: Recipe): Observable<Recipe[]> {
		console.log('recipeAdd', r);
		return this.http.post<Recipe[]>('https://localhost:7208/api/Recipe', r);
	}
	deleteRecipe(id: string): Observable<Recipe> {
		return this.http.delete<Recipe>('https://localhost:7208/api/Recipe/' + id);
	}
	putRecipe(id: string, r: Recipe): Observable<Recipe> {
		return this.http.put<Recipe>('https://localhost:7208/api/Recipe/' + id, r);
	}
	getCategoris(): Observable<Category[]> {
		return this.http.get<Category[]>('https://localhost:7208/api/Category');
	}
}
