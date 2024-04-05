import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneStatusComponent } from './one-status.component';

describe('OneStatusComponent', () => {
  let component: OneStatusComponent;
  let fixture: ComponentFixture<OneStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OneStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OneStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
