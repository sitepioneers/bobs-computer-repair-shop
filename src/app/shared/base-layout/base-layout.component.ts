/*
 *  Title: bas-layout.component.ts
 *  Author: April Auger, Wendy Portillo, Thip Rattanavilay
 *  Date: 11 April 2020
 *  Description: The base-layout component for the BCRS application.
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {
  year: number = Date.now();

  constructor() {

  }

  ngOnInit() {
  }

}
