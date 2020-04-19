/*
 *  Title: Verify Security Question Component
 *  Author: Thip Rattanavilay
 *  Date: 18 April 2020
 *  Description: A component used to verify security question.
 */


import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-verify-security-questions-form',
  templateUrl: './verify-security-questions-form.component.html',
  styleUrls: ['./verify-security-questions-form.component.css']
})
export class VerifySecurityQuestionsFormComponent implements OnInit {
  selectedSecurityQuestions: any;
  question1: string;
  question2: string;
  question3: string;
  username: string;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private fb: FormBuilder) {
    this.username = this.route.snapshot.queryParamMap.get('username');
    console.log(this.username);

    this.http.get('/api/users/' + this.username + '/security-questions').subscribe(res => {
      this.selectedSecurityQuestions = res;
      console.log(this.selectedSecurityQuestions);
    }, err => {
      console.log(err);
    }, () => {
      this.http.post('/api/security-questions/find-by-ids', {
        question1: this.selectedSecurityQuestions[0].questionId,
        question2: this.selectedSecurityQuestions[1].questionId,
        question3: this.selectedSecurityQuestions[2].questionId
      }).subscribe(res => {
        this.question1 = res[0].text;
        this.question2 = res[1].text;
        this.question3 = res[2].text;

        console.log(this.question1);
        console.log(this.question2);
        console.log(this.question3);
      });
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      answerToSecurityQuestion1: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion2: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion3: [null, Validators.compose([Validators.required])]
    });
  }

  verifySecurityQuestions() {
    const answerToSecurityQuestion1 = this.form.controls['answerToSecurityQuestion1'].value;
    const answerToSecurityQuestion2 = this.form.controls['answerToSecurityQuestion2'].value;
    const answerToSecurityQuestion3 = this.form.controls['answerToSecurityQuestion3'].value;

    this.http.post('/api/session/verify/users/' + this.username + '/security-questions', {
      answerToSecurityQuestion1: answerToSecurityQuestion1,
      answerToSecurityQuestion2: answerToSecurityQuestion2,
      answerToSecurityQuestion3: answerToSecurityQuestion3
    }).subscribe(res => {
      if (res['auth']) {
        this.router.navigate(['/session/reset-password'], {queryParams: {isAuthenticated: 'true', username: this.username}, skipLocationChange: true});
      } else {
        console.log('Unable to verify security question answers');
      }
    });
  }
}
