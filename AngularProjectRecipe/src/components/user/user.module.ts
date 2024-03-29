import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UserRoutingModule} from './user-routing.module copy';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
	declarations: [LoginComponent, RegisterComponent],
	imports: [CommonModule, UserRoutingModule, ReactiveFormsModule],
})
export class UserModule {}
