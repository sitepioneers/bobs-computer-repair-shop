import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityQuestionUserDetailsComponent } from './security-question-user-details.component';

describe('SecurityQuestionUserDetailsComponent', () => {
  let component: SecurityQuestionUserDetailsComponent;
  let fixture: ComponentFixture<SecurityQuestionUserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityQuestionUserDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityQuestionUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
