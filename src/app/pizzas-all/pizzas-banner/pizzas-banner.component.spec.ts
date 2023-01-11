import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzasBannerComponent } from './pizzas-banner.component';

describe('PizzasBannerComponent', () => {
  let component: PizzasBannerComponent;
  let fixture: ComponentFixture<PizzasBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzasBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzasBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
