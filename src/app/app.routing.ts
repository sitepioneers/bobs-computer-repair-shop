/*
 *  Title: app.routing.ts
 *  Author: April Auger, Wendy Portillo, Thip Rattanavilay
 *  Date: 4 April 2020
 *  Description: The routes for the BCRS application.
 */

import { Routes } from '@angular/router';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SessionGuard } from './shared/guards/session.guard';
import { RoleGuard } from './shared/guards/role.guard';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component'
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { SecurityQuestionDetailComponent } from './pages/security-question-detail/security-question-detail.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignoutComponent } from './pages/signout/signout.component';
import { ServerErrorComponent } from './pages/server-error/server-error.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetPasswordFormComponent } from './pages/reset-password-form/reset-password-form.component';
import { VerifySecurityQuestionsFormComponent } from './pages/verify-security-questions-form/verify-security-questions-form.component';
import { VerifyUsernameFormComponent } from './pages/verify-username-form/verify-username-form.component';
import { PurchasesByServiceComponent } from './pages/purchases-by-service/purchases-by-service.component';
import { InvoiceSummaryDialogComponent } from './pages/invoice-summary-dialog/invoice-summary-dialog.component';
import { RoleConfigurationComponent } from './pages/role-configuration/role-configuration.component';
import { RoleCreateComponent } from './pages/role-create/role-create.component';
import { RoleDetailComponent } from './pages/role-detail/role-detail.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ServiceRepairComponent } from './pages/service-repair/service-repair.component';

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
				path: 'contact',
				component: ContactComponent
			},
			{
				path: 'users',
				component: UserListComponent,
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
			},
			{
				path: "purchases-graph",
				component: PurchasesByServiceComponent,
				canActivate: [RoleGuard]
      },
      {
        path: 'service',
        component: ServiceRepairComponent,
        canActivate: [SessionGuard]
      },
			{
				path: "invoice-summary",
				component: InvoiceSummaryDialogComponent
			},
			{
				path: "roles",
				component: RoleConfigurationComponent,
				canActivate: [RoleGuard]
			},
			{
				path: "roles/create",
				component: RoleCreateComponent,
				canActivate: [RoleGuard]
			},
			{
				path: "roles/:roleId",
				component: RoleDetailComponent,
				canActivate: [RoleGuard]
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [RoleGuard]
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
			},
			{
				path: '500',
				component: ServerErrorComponent
			},
			{
				path: '404',
				component: NotFoundComponent
			},
			{
				path: 'register',
				component: RegisterComponent
			},
			{
				path: 'forgot',
				component: VerifyUsernameFormComponent
			},
			{
				path: 'verify-security-questions',
				component: VerifySecurityQuestionsFormComponent
			},
			{
				path: 'reset-password',
				component: ResetPasswordFormComponent
			},

		],
	},
	{
		path: '**',
		component: NotFoundComponent
	}
];
