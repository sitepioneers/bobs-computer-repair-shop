
import {Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

// Component Detail
@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.css']
})
// Exporting Component
export class SigninComponent implements OnInit {
	Form: FormGroup;
	errorMessage: string;

	constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private http: HttpClient) {}

	ngOnInit() {
		this.Form = this.fb.group({
		username: [null, Validators.compose([Validators.required])],
		password: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])]
	});
	}

	// Signin Function
	signin() {
		const username = this.Form.controls.username.value;
		const password = this.Form.controls.password.value;

		this.http.post('/api/session/signin', {
			username,
			password
		}).subscribe(res => {
			// tslint:disable-next-line: no-string-literal
			if (res['auth']) {
				// User is authenticated and we can grant them access
				// tslint:disable-next-line: no-string-literal
				this.cookieService.set('sessionuser', username, 1);
				this.router.navigate(['/']);
			} else {
				// User is not authenticated and we should return the error message
				this.errorMessage = res['text'];
		}
	});
}
}

