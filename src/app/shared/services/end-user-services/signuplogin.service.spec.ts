import { TestBed } from '@angular/core/testing';

import { SignuploginService } from './signuplogin.service';

describe('SignuploginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SignuploginService = TestBed.get(SignuploginService);
    expect(service).toBeTruthy();
  });
});
