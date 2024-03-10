import { TestBed } from '@angular/core/testing';

import { PopupServicesService } from './popup-services.service';

describe('PopupServicesService', () => {
  let service: PopupServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
