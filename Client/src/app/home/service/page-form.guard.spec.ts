import { TestBed, async, inject } from '@angular/core/testing';

import { PageFormGuard } from './page-form.guard';

describe('PageFormGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageFormGuard]
    });
  });

  it('should ...', inject([PageFormGuard], (guard: PageFormGuard) => {
    expect(guard).toBeTruthy();
  }));
});
