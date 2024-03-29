import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneEmployeeComponent } from './one-employee.component';

describe('OneEmployeeComponent', () => {
  let component: OneEmployeeComponent;
  let fixture: ComponentFixture<OneEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OneEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OneEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
