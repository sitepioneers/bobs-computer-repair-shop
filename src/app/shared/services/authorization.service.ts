/*
 *  Title: authorization-service.ts
 *  Author: April Auger
 *  Date: 11 April 2020
 *  Description: Service for controlling user authentication.
 */

// Required modules
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class AuthorizationService {

	constructor(private router: Router, private cookieService: CookieService, private http: HttpClient) { }

	/*
	 *  getSessionCookie()
	 *  Params: none
	 *  Response: string
	 *  Description: Returns the sessionuser cookie.
	 */
	public getSessionCookie(): string {
		const sessionUser = this.cookieService.get('sessionuser');
		if (sessionUser) {
			return sessionUser;
		} else {
			return null;
		}
	}

	/*
	 *  signInCheck()
	 *  Params: none
	 *  Response: Boolean
	 *  Description: Checks if a user has a session_user cookie.
	 */
	public signInCheck(): boolean {
		if (this.cookieService.get('sessionuser')) {
			return true;
		} else {
			return false;
		}
	}

	/*
	 *  signOut()
	 *  Params: none
	 *  Description: Removes the session_user cookie.
	 */
	public signOut() {
		// Properties
		let signedIn: string;
		signedIn = this.cookieService.get('sessionuser')

		if (signedIn) {
			this.cookieService.delete('sessionuser');
			this.router.navigate(['/session/signin']);
		}
	}

}