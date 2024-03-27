import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneProductAdminComponent } from './one-product-admin.component';

describe('OneProductAdminComponent', () => {
  let component: OneProductAdminComponent;
  let fixture: ComponentFixture<OneProductAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OneProductAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OneProductAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
