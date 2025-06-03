import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageTaskComponent } from './language-task.component';

describe('LanguageTaskComponent', () => {
  let component: LanguageTaskComponent;
  let fixture: ComponentFixture<LanguageTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
