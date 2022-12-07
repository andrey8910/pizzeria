import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { UsersService } from '../../../shared/services/users.service';
import { Users } from '../../../shared/interfaces/users';
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminUsersComponent implements OnInit {
  public allUsers: Users[]
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.initialize()
  }

    private initialize(){
      this.usersService.getUsers().pipe(
        tap((users) => {
          this.allUsers = users
        }),

      ).subscribe()
    }

    public addClient(){

    this.usersService.addUser({name: 'testName', login: 'testLogin', password: 'testPass'})
      .pipe(
        tap((data) => console.log(data))
      )
      .subscribe()
    }
}
