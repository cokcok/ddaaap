import { TestBed } from '@angular/core/testing';

import { PoddaaapService } from './poddaaap.service';

describe('PoddaaapService', () => {
  let service: PoddaaapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoddaaapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
