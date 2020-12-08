import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationResearchComponent } from './evaluation-research.component';

describe('EvaluationResearchComponent', () => {
  let component: EvaluationResearchComponent;
  let fixture: ComponentFixture<EvaluationResearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationResearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
