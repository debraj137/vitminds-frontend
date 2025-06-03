import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollAndPayComponent } from './enroll-and-pay.component';

describe('EnrollAndPayComponent', () => {
  let component: EnrollAndPayComponent;
  let fixture: ComponentFixture<EnrollAndPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollAndPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollAndPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
