import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationConsultancyComponent } from './evaluation-consultancy.component';

describe('EvaluationConsultancyComponent', () => {
  let component: EvaluationConsultancyComponent;
  let fixture: ComponentFixture<EvaluationConsultancyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationConsultancyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationConsultancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
