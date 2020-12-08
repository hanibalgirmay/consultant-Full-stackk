import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatedResearchComponent } from './evaluated-research.component';

describe('EvaluatedResearchComponent', () => {
  let component: EvaluatedResearchComponent;
  let fixture: ComponentFixture<EvaluatedResearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluatedResearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluatedResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
