import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignQuestionComponent } from './assign-question.component';

describe('AssignQuestionComponent', () => {
  let component: AssignQuestionComponent;
  let fixture: ComponentFixture<AssignQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
