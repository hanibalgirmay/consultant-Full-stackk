import { TestBed } from '@angular/core/testing';

import { EvaluationResearchService } from './evaluation-research.service';

describe('EvaluationResearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvaluationResearchService = TestBed.get(EvaluationResearchService);
    expect(service).toBeTruthy();
  });
});
