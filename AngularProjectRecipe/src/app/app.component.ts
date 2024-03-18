import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {LoginComponent} from '../components/user/login/login.component';
import {HomePageComponent} from '../components/home-page/home-page.component';
import {RegisterComponent} from '../components/user/register/register.component';
import {HeaderComponent} from '../components/header/header.component';
import {FooterComponent} from '../components/footer/footer.component';
import {UserModule} from '../components/user/user.module';
import {RecipeModule} from '../components/recipe/recipe.module';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'AngularProject';
}
