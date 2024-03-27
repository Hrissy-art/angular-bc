import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneMaterialComponent } from './one-material.component';

describe('OneMaterialComponent', () => {
  let component: OneMaterialComponent;
  let fixture: ComponentFixture<OneMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OneMaterialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OneMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
