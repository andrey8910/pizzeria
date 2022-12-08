import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UserAuthenticationCheckService} from "../../../shared/services/user-authentication-check.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ UserAuthenticationCheckService]
})
export class OrderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
