import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatedConsultantComponent } from './evaluated-consultant.component';

describe('EvaluatedConsultantComponent', () => {
  let component: EvaluatedConsultantComponent;
  let fixture: ComponentFixture<EvaluatedConsultantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluatedConsultantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluatedConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
