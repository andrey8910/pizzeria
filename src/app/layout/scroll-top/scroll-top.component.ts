import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2
} from '@angular/core';
import {WINDOW} from "../../core/window";
import {fromEvent} from "rxjs";
import {tap} from "rxjs/operators";




@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollTopComponent implements OnInit, AfterViewInit {

  private observer: IntersectionObserver;
  private footerElement: Element | null;



  constructor(
    private element :ElementRef,
    private readonly renderer: Renderer2,
    @Inject(WINDOW) private window: Window,

  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {

    if(!this.window){ return }

    this.footerElement = this.window.document.querySelector('app-footer');

    this.observer = new IntersectionObserver(this.handleIntersection.bind(this));
    if(this.footerElement) this.observer.observe(this.footerElement)
    this.handleScroll();
  }

  private handleScroll(){
      if(!this.window) return;

      const observable = fromEvent(this.window, 'scroll');

      observable.pipe(
        tap(() => {

        })
      ).subscribe()
  };

  private handleIntersection(entries: IntersectionObserverEntry[]){
     entries.forEach((entry) => {
       if(entry.target === this.footerElement && !entry.isIntersecting && this.element.nativeElement.firstElementChild){
         this.renderer.setStyle(
           this.element.nativeElement.firstElementChild, 'position', 'fixed'
         );
       }
       if(entry.target === this.footerElement && entry.isIntersecting && this.element.nativeElement.firstElementChild){
        this.renderer.setStyle(
          this.element.nativeElement.firstElementChild, 'position', 'fixed'
        );
       }
     })
  }

  public scroll(){
    this.window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


}
