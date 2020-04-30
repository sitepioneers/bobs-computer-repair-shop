/*
 *  Title: profile.component.ts
 *  Author: April Auger
 *  Date: 27 April 2020
 *  Description: User profile page.
 */


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	user: any;
	userId: string;
	username: string;
	firstName: string;
	lastName: string;
	roles: string;
	address: string;
	phone: string;
	email: string;

	constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
		this.username = this.route.snapshot.paramMap.get('username');

		this.http.get('/api/session/verify/users/' + this.username).subscribe(res => {
			this.user = res;
			this.firstName = this.user.firstName;
			this.lastName = this.user.lastName;
			this.address = this.user.address;
			this.phone = this.user.phoneNumber;
			this.email = this.user.email;
			this.roles = this.user.role;
			this.userId = this.user._id;
		}, err => {
			console.log(err);
		});
	}

	ngOnInit() {
	}

}
