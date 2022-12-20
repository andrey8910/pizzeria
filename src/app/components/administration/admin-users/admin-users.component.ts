import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { UsersService } from '../../../shared/services/users.service';
import { Users } from '../../../shared/interfaces/users';
import {tap} from "rxjs/operators";
import {Location} from "@angular/common";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdminUsersComponent implements OnInit {
  public allUsers: Users[]
  constructor(private usersService: UsersService,
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

    public addClient(){

    this.usersService.addUser({id: 0, name: 'testName', login: 'testLogin', password: 'testPass'})
      .pipe(
        tap((data) => console.log(data))
      )
      .subscribe()
    }

  public comeBack(){
    this.location.back()
  }
}
