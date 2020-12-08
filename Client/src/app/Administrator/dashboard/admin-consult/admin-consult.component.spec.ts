import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConsultComponent } from './admin-consult.component';

describe('AdminConsultComponent', () => {
  let component: AdminConsultComponent;
  let fixture: ComponentFixture<AdminConsultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminConsultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
