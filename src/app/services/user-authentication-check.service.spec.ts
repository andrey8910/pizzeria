import { TestBed } from '@angular/core/testing';

import { UserAuthenticationCheckService } from './user-authentication-check.service';

describe('UserAuthenticationCheckService', () => {
  let service: UserAuthenticationCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAuthenticationCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
