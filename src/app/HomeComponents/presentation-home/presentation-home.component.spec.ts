import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationHomeComponent } from './presentation-home.component';

describe('PresentationHomeComponent', () => {
  let component: PresentationHomeComponent;
  let fixture: ComponentFixture<PresentationHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PresentationHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PresentationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
