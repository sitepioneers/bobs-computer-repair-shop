/*
 *  Title: nav.component.ts
 *  Author: April Auger, Wendy Portillo, Thip Rattanavilay
 *  Date: 11 April 2020
 *  Description: The nav component for the BCRS application.
 */

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthorizationService } from '../services/authorization.service';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
	// Properties
	user: any;
	username: string = this.cookieService.get('sessionuser');
	isAdmin: boolean;

	constructor(private http: HttpClient, private AuthorizationService: AuthorizationService, private cookieService: CookieService) {
		this.http.get('/api/session/verify/users/' + this.username).subscribe(res => {
			this.user = res;

			if (this.user.role === 'admin') {
				this.isAdmin = true;
			} else {
				this.isAdmin = false;
			}

		}, err => {
			console.log(err);
		});
	}

	ngOnInit() {
	}

	public signOut() {
		this.AuthorizationService.signOut();
	}

}
