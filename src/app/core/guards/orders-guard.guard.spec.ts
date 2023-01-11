import { TestBed } from '@angular/core/testing';

import { OrdersGuardGuard } from './orders-guard.guard';

describe('OrdersGuardGuard', () => {
  let guard: OrdersGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OrdersGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
