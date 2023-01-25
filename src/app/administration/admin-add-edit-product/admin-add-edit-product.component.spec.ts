import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddEditProductComponent } from './admin-add-edit-product.component';

describe('AdminAddEditProductComponent', () => {
  let component: AdminAddEditProductComponent;
  let fixture: ComponentFixture<AdminAddEditProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddEditProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
