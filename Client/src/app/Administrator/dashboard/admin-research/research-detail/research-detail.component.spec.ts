import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchDetailComponent } from './research-detail.component';

describe('ResearchDetailComponent', () => {
  let component: ResearchDetailComponent;
  let fixture: ComponentFixture<ResearchDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
