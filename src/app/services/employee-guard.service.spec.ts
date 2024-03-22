import { TestBed } from '@angular/core/testing';

import { EmployeeGuardService } from './employee-guard.service';

describe('EmployeeGuardService', () => {
  let service: EmployeeGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
