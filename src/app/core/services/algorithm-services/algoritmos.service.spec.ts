import { TestBed } from '@angular/core/testing';

import { AlgoritmosService } from './algoritmos.service';

describe('AlgoritmosService', () => {
  let service: AlgoritmosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgoritmosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
