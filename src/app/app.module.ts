/*
 *  Title: app.module.ts
 *  Author: April Auger, Wendy Portillo, Thip Rattanavilay
 *  Date: 4 April 2020
 *  Description: The root module for the BCRS application.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { SessionGuard } from './shared/guards/session.guard';
import { RoleGuard } from './shared/guards/role.guard';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavComponent } from './shared/nav/nav.component';
import { AboutComponent } from './pages/about/about.component';
import { MatTableModule } from '@angular/material/table'
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

import { HomeComponent } from './pages/home/home.component';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { SecurityQuestionDetailComponent } from './pages/security-question-detail/security-question-detail.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { SigninComponent } from './pages/signin/signin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SecurityQuestionDeleteDialogComponent } from './dialogs/security-question-delete-dialog/security-question-delete-dialog.component';
import { UserDeleteDialogComponent } from './dialogs/user-delete-dialog/user-delete-dialog.component';
import { SignoutComponent } from './pages/signout/signout.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetPasswordFormComponent } from './pages/reset-password-form/reset-password-form.component';
import { VerifySecurityQuestionsFormComponent } from './pages/verify-security-questions-form/verify-security-questions-form.component';
import { VerifyUsernameFormComponent } from './pages/verify-username-form/verify-username-form.component';
import { ServerErrorComponent } from './pages/server-error/server-error.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PurchasesByServiceComponent } from './pages/purchases-by-service/purchases-by-service.component';
import { InvoiceSummaryDialogComponent } from './pages/invoice-summary-dialog/invoice-summary-dialog.component';

@NgModule({
	declarations: [
		AppComponent,
		BaseLayoutComponent,
		AuthLayoutComponent,
		HomeComponent,
		NavComponent,
		AboutComponent,
		SecurityQuestionCreateComponent,
		SecurityQuestionDetailComponent,
		SecurityQuestionListComponent,
		UserListComponent,
		UserDetailsComponent,
		SigninComponent,
		NotFoundComponent,
		SecurityQuestionDeleteDialogComponent,
		UserDeleteDialogComponent,
		SignoutComponent,
		RegisterComponent,
		ResetPasswordFormComponent,
		VerifySecurityQuestionsFormComponent,
		VerifyUsernameFormComponent,
		ServerErrorComponent,
		ContactComponent,
		PurchasesByServiceComponent,
		InvoiceSummaryDialogComponent
	],
	entryComponents: [UserDeleteDialogComponent, SecurityQuestionDeleteDialogComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forRoot(AppRoutes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled' }),
		FlexLayoutModule,
		MatToolbarModule,
		MatMenuModule,
		MatButtonModule,
		MatIconModule,
		MatCardModule,
		MatFormFieldModule,
		MatTableModule,
		MatInputModule,
		MatDialogModule,
		MatStepperModule,
		MatListModule,
		MatSelectModule
	],
	providers: [CookieService, SessionGuard, RoleGuard],
	bootstrap: [AppComponent]
})
export class AppModule { }
