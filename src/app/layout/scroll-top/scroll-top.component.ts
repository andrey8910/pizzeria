import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {WINDOW} from "../../core/window";
import {fromEvent} from "rxjs";
import {tap} from "rxjs/operators";


@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss']
})
export class ScrollTopComponent implements OnInit, AfterViewInit {

  constructor(
    @Inject(WINDOW) private window: Window
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {

    if(!this.window){ return }
    this.handleScroll()
  }

  private handleScroll(){
      if(!this.window) return;

      const observable = fromEvent(this.window, 'scroll');

      observable.pipe(
        tap(() => {

        })
      ).subscribe()
  }

  public scroll(){
    this.window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


}
