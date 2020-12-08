import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingRequestDetailComponent } from './training-request-detail.component';

describe('TrainingDetailComponent', () => {
  let component: TrainingRequestDetailComponent;
  let fixture: ComponentFixture<TrainingRequestDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingRequestDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
