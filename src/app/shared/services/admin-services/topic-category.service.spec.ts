import { TestBed } from '@angular/core/testing';

import { TopicCategoryService } from './topic-category.service';

describe('TopicCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopicCategoryService = TestBed.get(TopicCategoryService);
    expect(service).toBeTruthy();
  });
});
