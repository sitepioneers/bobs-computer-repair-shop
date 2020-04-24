/*
 *  Title: Role Detail Component
 *  Author: April Auger
 *  Date: 24 April 2020
 *  Description: Allows for editing user roles.
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-role-detail',
	templateUrl: './role-detail.component.html',
	styleUrls: ['./role-detail.component.css']
})
export class RoleDetailComponent implements OnInit {

	role: any;
	roleId: string;
	form: FormGroup;

	constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private router: Router) {
		this.roleId = this.route.snapshot.paramMap.get('roleId');

		this.http.get('/api/roles/' + this.roleId).subscribe(res => {
			this.role = res;
		}, err => {
			console.log(err);
		}, () => {
			console.log(this.role.text + "response")
			this.form.controls.text.setValue(this.role.text);
		})
	}

	ngOnInit() {
		this.form = this.fb.group({
			text: [null, Validators.compose([Validators.required])]
		});
	}

	// Save
	save() {
		this.http.put('/api/roles/' + this.roleId, {
			text: this.form.controls.text.value,
		}).subscribe(res => {
			this.router.navigate(['/roles']);
		});
	}

	// Cancel
	cancel() {
		this.router.navigate(['/roles']);
	}

}
