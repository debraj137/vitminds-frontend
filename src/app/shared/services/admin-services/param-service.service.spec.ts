import { TestBed } from '@angular/core/testing';

import { ParamServiceService } from './param-service.service';

describe('ParamServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParamServiceService = TestBed.get(ParamServiceService);
    expect(service).toBeTruthy();
  });
});
