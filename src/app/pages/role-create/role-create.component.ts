/*
 *  Title: Role Create Component
 *  Author: April Auger
 *  Date: 23 April 2020
 *  Description: Creates new user roles.
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-role-create',
	templateUrl: './role-create.component.html',
	styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {

	constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) { }
	form: FormGroup;
	ngOnInit() {
		this.form = this.fb.group({
			text: [null, Validators.compose([Validators.required])]
		});
	}

	// Create
	create() {
		this.http.post('/api/roles', {
			text: this.form.controls.text.value,
		}).subscribe(res => {
			this.router.navigate(['/roles']);
		})
	}

	// Cancel
	cancel() {
		this.router.navigate(['/roles']);
	}

}
