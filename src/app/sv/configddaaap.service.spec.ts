import { TestBed } from '@angular/core/testing';

import { ConfigddaaapService } from './configddaaap.service';

describe('ConfigddaaapService', () => {
  let service: ConfigddaaapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigddaaapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
