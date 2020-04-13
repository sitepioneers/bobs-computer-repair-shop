/*
 *  Title: User Create Component
 *  Author: April Auger, Wendy Portillo, Thip Rattanavilay
 *  Date: 12 April 2020
 *  Description: A component used to create new users.
 */

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

	constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) { }

	user: any;
	userId: string;
	form: FormGroup;
	roles: any;

	ngOnInit() {
		this.form = this.fb.group({
			username: [null, Validators.compose([Validators.required])],
			password: [null, Validators.compose([Validators.required])],
			firstName: [null, Validators.compose([Validators.required])],
			lastName: [null, Validators.compose([Validators.required])],
			phoneNumber: [null, Validators.compose([Validators.required])],
			address: [null, Validators.compose([Validators.required])],
			email: [null, Validators.compose([Validators.required])]
		})
	}

	// Create method
	create() {
		this.http.post('/api/users/create', {
			username: this.form.controls.username.value,
			password: this.form.controls.password.value,
			firstName: this.form.controls.firstName.value,
			lastName: this.form.controls.lastName.value,
			phoneNumber: this.form.controls.phoneNumber.value,
			address: this.form.controls.address.value,
			email: this.form.controls.email.value,
			isDisabled: false,
			role: 'standard',
			date_created: new Date(),
			date_modified: new Date()
		}).subscribe(res => {
			this.router.navigate(['/users']);
		})
	}

	// Cancel
	cancel() {
		this.router.navigate(['/users']);
	}

}
