import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneServiceComponent } from './one-service.component';

describe('OneServiceComponent', () => {
  let component: OneServiceComponent;
  let fixture: ComponentFixture<OneServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OneServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OneServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
