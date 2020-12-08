import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchRequestDetailComponent } from './research-request-detail.component';

describe('ResearchDetailComponent', () => {
  let component: ResearchRequestDetailComponent;
  let fixture: ComponentFixture<ResearchRequestDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchRequestDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
