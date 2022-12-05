import { TestBed } from '@angular/core/testing';

import { ChangeCommentsSubjectBehaviorService } from './change-comments-subject-behavior.service';

describe('ChangeCommentsSubjectBehaviorService', () => {
  let service: ChangeCommentsSubjectBehaviorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeCommentsSubjectBehaviorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
