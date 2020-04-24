/*
 *  Title: Role Delete Dialog
 *  Author: April Auger
 *  Date: 23 April 2020
 *  Description: The role delete dialog.
 */

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-role-delete-dialog',
	templateUrl: './role-delete-dialog.component.html',
	styleUrls: ['./role-delete-dialog.component.css']
})
export class RoleDeleteDialogComponent implements OnInit {
	roleId: string;

	constructor(
		private dialogRef: MatDialogRef<RoleDeleteDialogComponent>,
		@Inject(MAT_DIALOG_DATA) data) {
		this.roleId = data.roleId;
	}

	ngOnInit() {
	}

}
