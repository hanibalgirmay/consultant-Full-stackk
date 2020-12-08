import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportprogressResearchComponent } from './reportprogress-research.component';

describe('ReportprogressResearchComponent', () => {
  let component: ReportprogressResearchComponent;
  let fixture: ComponentFixture<ReportprogressResearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportprogressResearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportprogressResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
