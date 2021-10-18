import { TestBed } from '@angular/core/testing';

import { TourLeaderService } from './tour-leader.service';

describe('TourLeaderService', () => {
  let service: TourLeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourLeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
