import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneOrderAssignComponent } from './one-order-assign.component';

describe('OneOrderAssignComponent', () => {
  let component: OneOrderAssignComponent;
  let fixture: ComponentFixture<OneOrderAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OneOrderAssignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OneOrderAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
