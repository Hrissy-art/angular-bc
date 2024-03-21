import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneOrderSearchComponent } from './one-order-search.component';

describe('OneOrderSearchComponent', () => {
  let component: OneOrderSearchComponent;
  let fixture: ComponentFixture<OneOrderSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OneOrderSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OneOrderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
