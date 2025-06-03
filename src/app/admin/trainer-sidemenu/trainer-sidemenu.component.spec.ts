import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerSidemenuComponent } from './trainer-sidemenu.component';

describe('TrainerSidemenuComponent', () => {
  let component: TrainerSidemenuComponent;
  let fixture: ComponentFixture<TrainerSidemenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerSidemenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerSidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
