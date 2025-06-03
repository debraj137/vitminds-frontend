import { TestBed } from '@angular/core/testing';

import { ProfileuploadService } from './profileupload.service';

describe('ProfileuploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileuploadService = TestBed.get(ProfileuploadService);
    expect(service).toBeTruthy();
  });
});
