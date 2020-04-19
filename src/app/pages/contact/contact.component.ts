import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  messageInfo = {
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  }
  constructor() { }

  ngOnInit() {
  }
// onClick() {
  //   alert('Your message has been received!');
  //   this.messageInfo.firstName = '';
  // }

  onSubmit(event: any) {
    console.log(event);
    // tslint:disable-next-line: max-line-length
    alert(this.messageInfo.firstName + ' ' + this.messageInfo.lastName + ', thank you for your message. We have received it and will get back to you shortly.');
    event.resetForm();
  }


}
