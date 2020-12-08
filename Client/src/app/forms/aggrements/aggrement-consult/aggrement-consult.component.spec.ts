import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggrementConsultComponent } from './aggrement-consult.component';

describe('AggrementConsultComponent', () => {
  let component: AggrementConsultComponent;
  let fixture: ComponentFixture<AggrementConsultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggrementConsultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggrementConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
