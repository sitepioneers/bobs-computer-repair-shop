/*
 *  Title: Role Configuration Component
 *  Author: April Auger
 *  Date: 23 April 2020
 *  Description: A component used to manage user roles.
 */

import { Component, OnInit } from '@angular/core';
import { RoleDeleteDialogComponent } from '../../dialogs/role-delete-dialog/role-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-role-configuration',
	templateUrl: './role-configuration.component.html',
	styleUrls: ['./role-configuration.component.css']
})
export class RoleConfigurationComponent implements OnInit {
	roles: any;
	displayedColumns = ['text', 'functions'];

	constructor(private http: HttpClient, private dialog: MatDialog) {
		this.http.get('/api/roles').subscribe(res => {
			this.roles = res;
			console.log(this.roles);
		}, err => {
			console.log(err);
		});
	}

	ngOnInit() {
	}

	delete(roleId) {
		const dialogRef = this.dialog.open(RoleDeleteDialogComponent, {
			data: {
				roleId
			},
			disableClose: true,
			width: '800px'
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result === 'confirm') {
				this.http.delete('/api/roles/' + roleId).subscribe(res => {
					console.log('Role deleted');
					this.roles = this.roles.filter(r => r._id !== roleId);
				});
			}
		});
	}

}
