import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneClientComponent } from './one-client.component';

describe('OneClientComponent', () => {
  let component: OneClientComponent;
  let fixture: ComponentFixture<OneClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OneClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OneClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
