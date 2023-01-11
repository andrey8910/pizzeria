import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSliderEditorComponent } from './admin-slider-editor.component';

describe('AdminSliderEditorComponent', () => {
  let component: AdminSliderEditorComponent;
  let fixture: ComponentFixture<AdminSliderEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSliderEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSliderEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
