import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutusHomeComponent } from './aboutus-home.component';

describe('AboutusHomeComponent', () => {
  let component: AboutusHomeComponent;
  let fixture: ComponentFixture<AboutusHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutusHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutusHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
