import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { UsersService } from '../../../shared/services/users.service';
import { Users } from '../../../shared/interfaces/users';
import {finalize, tap} from "rxjs/operators";
import {Location} from "@angular/common";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdminUsersComponent implements OnInit {

  public allUsers: Users[]

  constructor(private usersService: UsersService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private cdr: ChangeDetectorRef,
              private location: Location) { }

  ngOnInit(): void {
    this.initialize()

  }

    private initialize(){
      this.usersService.getUsers().pipe(
        tap((users) => {
          this.allUsers = users
          this.cdr.markForCheck();
        }),

      ).subscribe()
    }

    public deleteUser(user: Users){

      this.confirmationService.confirm({
        message: `Ви впевнені, що хочете видалити користувача ${user.name}?`,
        header: 'Видалення користувача із системи',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.usersService.deleteUser(user.id).pipe(
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

    public addClient(){

    this.usersService.addUser({id: 0, name: 'testName', login: 'testLogin', password: 'testPass'})
      .pipe(
        tap((data) => console.log(data)),
        finalize(() =>  this.initialize())
      )
      .subscribe()
    }

  public comeBack(){
    this.location.back()
  }
}
