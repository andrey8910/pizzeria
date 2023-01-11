import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSliderItemComponent } from './admin-slider-item.component';

describe('AdminSliderItemComponent', () => {
  let component: AdminSliderItemComponent;
  let fixture: ComponentFixture<AdminSliderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSliderItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSliderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
