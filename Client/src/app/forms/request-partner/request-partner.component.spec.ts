import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPartnerComponent } from './request-partner.component';

describe('RequestPartnerComponent', () => {
  let component: RequestPartnerComponent;
  let fixture: ComponentFixture<RequestPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
