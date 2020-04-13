/*
 *  Title: app.routing.ts
 *  Author: April Auger, Wendy Portillo, Thip Rattanavilay
 *  Date: 4 April 2020
 *  Description: The routes for the BCRS application.
 */

import { Routes } from '@angular/router';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent} from './shared/auth-layout/auth-layout.component';
import { SessionGuard } from './shared/guards/session.guard';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { SecurityQuestionDetailComponent } from './pages/security-question-detail/security-question-detail.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignoutComponent } from './pages/signout/signout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';

export const AppRoutes: Routes = [
	{
		path: '',
		component: BaseLayoutComponent,
		children: [
			{
				path: '',
				component: HomeComponent,
			},
			{
				path: 'about',
				component: AboutComponent
			},
			{
				path: 'users',
				component: UserListComponent,
				canActivate: [SessionGuard]
			},
			{
				path: 'users/create',
				component: UserCreateComponent,
				canActivate: [SessionGuard]
			},
			{
				path: 'users/:userId',
				component: UserDetailsComponent,
				canActivate: [SessionGuard]
			},
			{
				path: 'security-questions',
				component: SecurityQuestionListComponent,
				canActivate: [SessionGuard]
			},
			{
				path: 'security-questions/:questionId',
				component: SecurityQuestionDetailComponent,
				canActivate: [SessionGuard]
			},
			{
				path: 'security-questions/create/new',
				component: SecurityQuestionCreateComponent,
				canActivate: [SessionGuard]
			}
		]
	},
	{
		path: 'session',
		component: AuthLayoutComponent,
		children: [
			{
				path: 'signin',
				component: SigninComponent
			},
			{
				path: 'signout',
				component: SignoutComponent,
				canActivate: [SessionGuard]
			}
		],
	},
	{
		path: '**',
		component: NotFoundComponent
	}
];
