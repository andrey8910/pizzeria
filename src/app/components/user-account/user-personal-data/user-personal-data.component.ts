import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {UserAuthenticationCheckService} from "../../../shared/services/user-authentication-check.service";
import {Observable} from "rxjs";
import {AuthorizationDialogData} from "../../../shared/interfaces/authorization-dialog";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-user-personal-data',
  templateUrl: './user-personal-data.component.html',
  styleUrls: ['./user-personal-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPersonalDataComponent implements OnInit {

  public userAuthenticationCheck$: Observable<AuthorizationDialogData> ;
  public resultAuth: AuthorizationDialogData;

  constructor( private location: Location,
               private userAuthCheckService: UserAuthenticationCheckService,
               private cdr: ChangeDetectorRef,) { }

  ngOnInit(): void {
    this.init()
  }

  private init(){
    this.userAuthenticationCheck$ = this.userAuthCheckService.userAuthenticationCheck$
    this.userAuthenticationCheck$.pipe(
      tap(res => {
        if(res.isPassedAuthentication){
          this.resultAuth = res
          this.cdr.markForCheck();
        }

      })
    ).subscribe()
  }


  public comeBack(){
    this.location.back()
  }
}
