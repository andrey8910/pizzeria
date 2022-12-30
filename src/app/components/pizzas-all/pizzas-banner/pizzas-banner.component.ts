import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SliderService} from "../../../shared/services/slider.service";
import {takeUntil, tap} from "rxjs/operators";
import {SliderData} from "../../../shared/interfaces/slider-data";
import {Subject} from "rxjs";

@Component({
  selector: 'app-pizzas-banner',
  templateUrl: './pizzas-banner.component.html',
  styleUrls: ['./pizzas-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzasBannerComponent implements OnInit {
  public sliderData: SliderData[] = [];
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private sliderService:SliderService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.init()
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private init(){
    this.sliderService.getSliderDataSortByOrder().pipe(
      tap(res => {
        this.sliderData = res
        this.cdr.markForCheck();

      }),
      takeUntil(this.destroy$)
    ).subscribe()
  }

}
