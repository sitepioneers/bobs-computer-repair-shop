/*
 *  Title: app.module.ts
 *  Author: April Auger, Wendy Portillo, Thip Rattanavilay
 *  Date: 4 April 2020
 *  Description: The root module for the BCRS application.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { AppRoutes } from './app.routing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { SessionGuard } from './shared/guards/session.guard.js';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavComponent } from './shared/nav/nav.component';
import { AboutComponent } from './pages/about/about.component';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { SecurityQuestionDetailComponent } from './pages/security-question-detail/security-question-detail.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { SecurityQuestionSigninComponent } from './pages/security-question-signin/security-question-signin.component';
import { SecurityQuestionUserListComponent } from './pages/security-question-user-list/security-question-user-list.component';
import { SecurityQuestionUserDetailsComponent } from './pages/security-question-user-details/security-question-user-details.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { SigninComponent } from './pages/signin/signin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

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
		SecurityQuestionSigninComponent,
		SecurityQuestionUserListComponent,
		SecurityQuestionUserDetailsComponent,
		UserListComponent,
		UserDetailsComponent,
		SigninComponent,
		NotFoundComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forRoot(AppRoutes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'}),
		FlexLayoutModule,
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatCardModule,
		MatFormFieldModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
