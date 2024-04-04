import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePaymentComponent } from './one-payment.component';

describe('OnePaymentComponent', () => {
  let component: OnePaymentComponent;
  let fixture: ComponentFixture<OnePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnePaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
