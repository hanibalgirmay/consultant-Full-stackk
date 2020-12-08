import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatedResearchViewComponent } from './evaluated-research-view.component';

describe('EvaluatedResearchViewComponent', () => {
  let component: EvaluatedResearchViewComponent;
  let fixture: ComponentFixture<EvaluatedResearchViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluatedResearchViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluatedResearchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
