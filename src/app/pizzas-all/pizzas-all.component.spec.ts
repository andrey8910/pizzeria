import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzasAllComponent } from './pizzas-all.component';

describe('PizzasAllComponent', () => {
  let component: PizzasAllComponent;
  let fixture: ComponentFixture<PizzasAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzasAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzasAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
