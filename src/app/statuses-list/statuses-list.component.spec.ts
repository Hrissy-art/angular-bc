import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusesListComponent } from './statuses-list.component';

describe('StatusesListComponent', () => {
  let component: StatusesListComponent;
  let fixture: ComponentFixture<StatusesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
