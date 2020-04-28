/*
 *  Title: User Create Component
 *  Author: April Auger
 *  Date: 12 April 2020
 *  Description: A component used to create new users.
 */

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../models/user.model';
import { SecurityQuestion } from '../../models/security-question.model';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	// Properties
	contactInformationForm: FormGroup;
	securityQuestionsForm: FormGroup;
	credentialsForm: FormGroup;
	user = new User();
	securityQuestions: SecurityQuestion[];
	errorMessage: string;

	/*
	*  constructure
	*  Params: http, router, cookieService
	*  The component's constructor function
	*/
	constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private cookieService: CookieService) {
		// Retrieves a list of security questions
		this.http.get<SecurityQuestion[]>('/api/security-questions')
			.subscribe(question => {
				this.securityQuestions = question;
			}, err => {
				console.log(err);
			});
	}

	/*
	 *  ngOnInit
	 *  Params: none
	 *  Initializes the component.
	 */
	ngOnInit() {
		// Contact information group
		this.contactInformationForm = this.fb.group({
			firstName: [null, Validators.compose([Validators.required])],
			lastName: [null, Validators.compose([Validators.required])],
			address: [null, Validators.compose([Validators.required])],
			phoneNumber: [null, Validators.compose([Validators.required])],
			email: [null, Validators.compose([Validators.required])],
		});

		// Wathces for changes made to fields in the contactInformationForm
		this.contactInformationForm.valueChanges.subscribe(() => {
			this.user.firstName = this.contactInformationForm.controls.firstName.value;
			this.user.lastName = this.contactInformationForm.controls.lastName.value;
			this.user.address = this.contactInformationForm.controls.address.value;
			this.user.phoneNumber = this.contactInformationForm.controls.phoneNumber.value;
			this.user.email = this.contactInformationForm.controls.email.value;
		});

		// Security question group
		this.securityQuestionsForm = this.fb.group({
			securityQuestion1: [null, Validators.compose([Validators.required])],
			securityQuestion2: [null, Validators.compose([Validators.required])],
			securityQuestion3: [null, Validators.compose([Validators.required])],
			answerToSecurityQuestion1: [null, Validators.compose([Validators.required])],
			answerToSecurityQuestion2: [null, Validators.compose([Validators.required])],
			answerToSecurityQuestion3: [null, Validators.compose([Validators.required])]
		});

		// Credentials group
		this.credentialsForm = this.fb.group({
			username: [null, Validators.compose([Validators.required])],
			password: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])]
		});

		// Wathces for changes made to fields in the credentialsForm
		this.credentialsForm.valueChanges.subscribe(() => {
			this.user.username = this.credentialsForm.controls.username.value;
			this.user.password = this.credentialsForm.controls.password.value;
		});
	}

	/*
	*  storeQuestions
	*  Params: none
	*  Stores the user's questions and responses to the user object
	*/
	storeQuestions() {
		this.user.securityQuestions = [];
		this.user.securityQuestions.push({ questionId: this.securityQuestionsForm.controls.securityQuestion1.value, answer: this.securityQuestionsForm.controls.answerToSecurityQuestion1.value }),
			this.user.securityQuestions.push({ questionId: this.securityQuestionsForm.controls.securityQuestion2.value, answer: this.securityQuestionsForm.controls.answerToSecurityQuestion2.value }),
			this.user.securityQuestions.push({ questionId: this.securityQuestionsForm.controls.securityQuestion3.value, answer: this.securityQuestionsForm.controls.answerToSecurityQuestion3.value })
	}

	/*
	*  register
	*  Params: form
	*  Registers the new user.
	*/
	register() {
		console.log(this.user)
		this.http.post('/api/session/register', this.user).subscribe(res => {
			// The user is authenticated and access may be granted.
			if (res['auth']) {
				this.cookieService.set('isAuthenticated', 'true', 1);
				this.cookieService.set('sessionuser', this.user.username, 1);
				this.router.navigate(['/user/profile/' + this.user.username]);
			}
			// The user is not authenticated and a message will be returned to the user.
			else {
				this.errorMessage = res['text'];
			}
		}, err => {
			// There was an error and a message will be returned to the user.
			console.log(err);
			this.errorMessage = err.error.text;
		});
	}

}
