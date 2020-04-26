/*
 *  Title: user.list.component.ts
 *  Author: April Auger
 *  Date: 10 April 2020
 *  Description: Functionality for the user details component.
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-user-details',
	templateUrl: './user-details.component.html',
	styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
	user: any;
	userId: string;
	form: FormGroup;
	roles: any;

	constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private router: Router) {
		this.userId = this.route.snapshot.paramMap.get('userId');

		this.http.get('/api/users/' + this.userId).subscribe(res => {
			this.user = res;
		}, err => {
			console.log(err);
		}, () => {
			this.form.controls.firstName.setValue(this.user.firstName);
			this.form.controls.lastName.setValue(this.user.lastName);
			this.form.controls.address.setValue(this.user.address);
			this.form.controls.phoneNumber.setValue(this.user.phoneNumber);
			this.form.controls.email.setValue(this.user.email);
			this.form.controls.role.setValue(this.user.role);
			this.form.controls.securityQuestions.setValue(this.user.securityQuestions);
      console.log(this.form.controls.securityQuestions);
      // map roles to users update
      this.http.get('/api/roles').subscribe(res => {
        this.roles = res;
        console.log(this.roles);
      }, err => {
        console.log(err);
      })
		});
	}

	ngOnInit() {
		this.form = this.fb.group({
			firstName: [null, Validators.compose([Validators.required])],
			lastName: [null, Validators.compose([Validators.required])],
			address: [null, Validators.compose([Validators.required])],
			phoneNumber: [null, Validators.compose([Validators.required])],
			email: [null, Validators.compose([Validators.required, Validators.email])],
			role: [null, Validators.compose([Validators.required])],
			securityQuestions: [null, Validators.compose([Validators.required])]
		});
	}

	saveUser() {
		this.http.put('/api/users/' + this.userId, {
			firstName: this.form.controls.firstName.value,
			lastName: this.form.controls.lastName.value,
			address: this.form.controls.address.value,
			phoneNumber: this.form.controls.phoneNumber.value,
			email: this.form.controls.email.value,
			role: this.form.controls.role.value,
			securityQuestions: this.form.controls.securityQuestions.value
		}).subscribe(res => {
			this.router.navigate(['/users']);
		});
	};

	cancel() {
		this.router.navigate(['/users']);
	}
}
