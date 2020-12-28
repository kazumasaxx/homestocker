import { TestBed } from '@angular/core/testing';

import { stockService } from './stock.service';

describe('stockService', () => {
  let service: stockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(stockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
