import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularJobCategoryComponent } from './popular-job-category.component';

describe('PopularJobCategoryComponent', () => {
  let component: PopularJobCategoryComponent;
  let fixture: ComponentFixture<PopularJobCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularJobCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularJobCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
