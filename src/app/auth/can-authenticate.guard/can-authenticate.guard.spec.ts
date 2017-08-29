import { TestBed, async, inject } from '@angular/core/testing';

import { CanAuthenticateGuard } from './can-authenticate.guard';

describe('CanAuthenticateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanAuthenticateGuard]
    });
  });

  it('should ...', inject([CanAuthenticateGuard], (guard: CanAuthenticateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
