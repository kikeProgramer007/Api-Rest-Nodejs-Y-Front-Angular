import { TestBed } from '@angular/core/testing';

import { NotaventaService } from './notaventa.service';

describe('NotaventaService', () => {
  let service: NotaventaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotaventaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
