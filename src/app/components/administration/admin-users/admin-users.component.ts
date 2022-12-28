import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { UsersService } from '../../../shared/services/users.service';
import { Users } from '../../../shared/interfaces/users';
import {finalize, takeUntil, tap} from "rxjs/operators";
import {Location} from "@angular/common";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {passEqual, ValidateLogin, ValidatePass, ValidatePassConfirm} from "../../../shared/Validators";
import {Subject} from "rxjs";


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdminUsersComponent implements OnInit, OnDestroy {

  public allUsers: Users[];
  public displayModal = false;
  public formAddNewUser: FormGroup;
  public hidePass = true;
  public hideConfirmPass = true;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private usersService: UsersService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private cdr: ChangeDetectorRef,
              private location: Location) { }

  ngOnInit(): void {
    this.initialize()

  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

    private initialize(){
      this.usersService.getUsers().pipe(
        takeUntil(this.destroy$),
        tap((users) => {
          this.allUsers = users
          this.cdr.markForCheck();
        }),
      ).subscribe()
      this.createFormAddNewUser()
    }

  private createFormAddNewUser(){
    this.formAddNewUser = new FormGroup<any>({
      name: new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(12)]),
      login: new FormControl('', [Validators.required, ValidateLogin]),
      password: new FormControl('', [Validators.required, ValidatePass]),
      confirmPassword: new FormControl('', [Validators.required, ValidatePassConfirm])
    }, passEqual('password', 'confirmPassword'))

  }

    public deleteUser(user: Users){

      this.confirmationService.confirm({
        message: `Ви впевнені, що хочете видалити користувача ${user.name}?`,
        header: 'Видалення користувача із системи',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.usersService.deleteUser(user.id).pipe(
            takeUntil(this.destroy$),
            tap(res => {
              this.cdr.markForCheck();
              if(res){
                this.messageService.add({severity:'info', summary:'Підтверджено', detail:`Дані користувача ${user.name} видалено `});
              }
            }),
            finalize(() =>   this.initialize())
          ).subscribe()
        },
        reject: (type: any) => {
          switch(type) {
            case ConfirmEventType.REJECT:
              this.messageService.add({severity:'error', summary:'Відміна', detail:'Видалення відмінено'});
              break;
            case ConfirmEventType.CANCEL:
              this.messageService.add({severity:'warn', summary:'Скасування', detail:'Операція скасована'});
              break;
          }
        }
      });
  }

    public addClient(formValue: any){
    this.formAddNewUser.reset()
    this.displayModal = false

    const newUser = {
      id: 0,
      name : formValue.name,
      login : formValue.login,
      password : formValue.password,
    }

    this.usersService.addUser(newUser)
      .pipe(
        takeUntil(this.destroy$),
        tap((data) => console.log(data)),
        finalize(() =>  this.initialize())
      )
      .subscribe()
    }

  public comeBack(){
    this.location.back()
  }
}
