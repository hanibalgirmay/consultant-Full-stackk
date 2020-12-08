import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminResearchComponent } from './admin-research.component';

describe('AdminResearchComponent', () => {
  let component: AdminResearchComponent;
  let fixture: ComponentFixture<AdminResearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminResearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
