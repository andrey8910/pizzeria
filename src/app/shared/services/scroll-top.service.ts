import {Inject, Injectable} from '@angular/core';
import {fromEvent} from "rxjs";
import {WINDOW} from "../../core/window";
import {ViewportScroller} from "@angular/common";
import {tap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ScrollTopService {

  constructor(
    @Inject(WINDOW) private window: Window,
    private viewportScroller: ViewportScroller,
  ) { }

  public visible = false
  private  observable = fromEvent(this.window, 'scroll')

   handleScroll(){
    if(!this.window) return;
   return this.observable
  }
}
