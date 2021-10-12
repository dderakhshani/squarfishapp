import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getData', () => {
    expect(service.getData).toBeTruthy();
  });

  it('should have getDataByParam', () => {
    expect(service.getDataByParam).toBeTruthy();
  });

  it('should have postJsonData', () => {
    expect(service.postJsonData).toBeTruthy();
  });
});
