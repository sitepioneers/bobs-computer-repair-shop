import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityQuestionUserListComponent } from './security-question-user-list.component';

describe('SecurityQuestionUserListComponent', () => {
  let component: SecurityQuestionUserListComponent;
  let fixture: ComponentFixture<SecurityQuestionUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityQuestionUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityQuestionUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
