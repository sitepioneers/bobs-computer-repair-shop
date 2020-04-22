import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'app-invoice-summary-dialog',
	templateUrl: './invoice-summary-dialog.component.html',
	styleUrls: ['./invoice-summary-dialog.component.css']
})
export class InvoiceSummaryDialogComponent implements OnInit {
	invoice: any;

	constructor(private dialogRef: MatDialogRef<InvoiceSummaryDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
		this.invoice = data.invoice;
	}

	ngOnInit() {
	}

}
