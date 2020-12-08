import { TestBed } from '@angular/core/testing';

import { EvaluationConsultService } from './evaluation-consult.service';

describe('EvaluationConsultService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvaluationConsultService = TestBed.get(EvaluationConsultService);
    expect(service).toBeTruthy();
  });
});
