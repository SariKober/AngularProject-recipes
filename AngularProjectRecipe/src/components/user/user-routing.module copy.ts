import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Route, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {LogOutComponent} from './log-out/log-out.component';

const user_router: Route[] = [
	{path: '', redirectTo: 'login', pathMatch: 'full'},
	{path: 'login', component: LoginComponent},
	{path: 'register', component: RegisterComponent},
	{path: 'log-out', component: LogOutComponent},
];

@NgModule({
	declarations: [],
	imports: [RouterModule.forChild(user_router)],
	exports: [RouterModule],
})
export class UserRoutingModule {}
