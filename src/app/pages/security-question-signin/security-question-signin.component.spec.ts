import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityQuestionSigninComponent } from './security-question-signin.component';

describe('SecurityQuestionSigninComponent', () => {
  let component: SecurityQuestionSigninComponent;
  let fixture: ComponentFixture<SecurityQuestionSigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityQuestionSigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityQuestionSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
