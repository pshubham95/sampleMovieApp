import { TestBed } from '@angular/core/testing';

import { PopularMoviesService } from './popular-movies.service';

describe('PopularMoviesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PopularMoviesService = TestBed.get(PopularMoviesService);
    expect(service).toBeTruthy();
  });
});
