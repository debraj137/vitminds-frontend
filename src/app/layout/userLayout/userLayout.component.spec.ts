import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UserLayoutComponent } from "./userLayout.component";

describe("UserLayoutComponent", () => {
  let component: UserLayoutComponent;
  let fixture: ComponentFixture<UserLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserLayoutComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
