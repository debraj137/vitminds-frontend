import { TestBed } from '@angular/core/testing';

import { HomeSubjectService } from './home-subject.service';

describe('HomeSubjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeSubjectService = TestBed.get(HomeSubjectService);
    expect(service).toBeTruthy();
  });
});
