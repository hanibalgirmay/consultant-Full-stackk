import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPassswordComponent } from './user-passsword.component';

describe('UserPassswordComponent', () => {
  let component: UserPassswordComponent;
  let fixture: ComponentFixture<UserPassswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPassswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPassswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
