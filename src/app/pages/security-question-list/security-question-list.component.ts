/*
 *  Title: Security Question List
 *  Author: Thip Rattanavilay
 *  Date: 10 April 2020
 *  Description: The security question list.
 */

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { SecurityQuestionDeleteDialogComponent } from '../../dialogs/security-question-delete-dialog/security-question-delete-dialog.component';

@Component({
	selector: 'app-security-question-list',
	templateUrl: './security-question-list.component.html',
	styleUrls: ['./security-question-list.component.css']
})


export class SecurityQuestionListComponent implements OnInit {
	securityQuestions: any;
	displayedColumns = ['question', 'functions'];

	constructor(private http: HttpClient, private dialog: MatDialog, ) {
		this.http.get('/api/security-questions').subscribe(res => {
			this.securityQuestions = res;
			console.log(this.securityQuestions);
		}, err => {
			console.log(err);
		})
	}

	ngOnInit() {
	}

	delete(questionId) {
		const dialogRef = this.dialog.open(SecurityQuestionDeleteDialogComponent, {
			data: {
				questionId
			},
			disableClose: true,
			width: '800px'
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result === 'confirm') {
				this.http.delete('/api/security-questions/' + questionId).subscribe(res => {
					console.log('User Deleted');
					this.securityQuestions = this.securityQuestions.filter(q => q._id !== questionId);
					console.log(this.securityQuestions);
				});
			}
		});
	}

}

export class SecurityQuestionDeleteDialog { }
