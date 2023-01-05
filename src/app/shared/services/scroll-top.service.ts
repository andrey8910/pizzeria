import {Inject, Injectable} from '@angular/core';
import {fromEvent} from "rxjs";
import {WINDOW} from "../../core/window";


@Injectable({
  providedIn: 'root'
})
export class ScrollTopService {

  constructor(
    @Inject(WINDOW) private window: Window
  ) { }

  public visible = false
  private  observable = fromEvent(this.window, 'scroll');

   handleScroll(){
    if(!this.window) return;
    return this.observable;
  }
}
