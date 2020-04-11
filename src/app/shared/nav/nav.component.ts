import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

	constructor(private AuthorizationService: AuthorizationService, private cookieService: CookieService) { }

	ngOnInit() {
	}

	// Properties
	signedIn: string = this.cookieService.get('sessionuser');

	public signOut() {
		this.AuthorizationService.signOut();
	}

}
