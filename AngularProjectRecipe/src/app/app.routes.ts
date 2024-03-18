import {Routes} from '@angular/router';
import {loginGuard} from '../components/user/login/login.guard';
import {HomePageComponent} from '../components/home-page/home-page.component';

export const routes: Routes = [
	{path: '', component: HomePageComponent},
	{
		path: 'user',
		loadChildren: () =>
			import('../components/user/user.module').then((c) => c.UserModule),
	},
	{
		path: 'recipe',
		loadChildren: () =>
			import('../components/recipe/recipe.module').then((c) => c.RecipeModule),
	},
];
