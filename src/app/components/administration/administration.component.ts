import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdministrationComponent implements OnInit {

  constructor( private location: Location) { }

  ngOnInit(): void {
  }

  public comeBack(){
    this.location.back()
  }

}
