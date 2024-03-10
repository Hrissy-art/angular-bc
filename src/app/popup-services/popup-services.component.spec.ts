import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupServicesComponent } from './popup-services.component';

describe('PopupServicesComponent', () => {
  let component: PopupServicesComponent;
  let fixture: ComponentFixture<PopupServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
