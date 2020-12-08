import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatedConsultantViewComponent } from './evaluated-consultant-view.component';

describe('EvaluatedConsultantViewComponent', () => {
  let component: EvaluatedConsultantViewComponent;
  let fixture: ComponentFixture<EvaluatedConsultantViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluatedConsultantViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluatedConsultantViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
