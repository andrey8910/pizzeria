import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {SliderData} from "../../../shared/interfaces/slider-data";
import {SliderService} from "../../../shared/services/slider.service";
import {takeUntil, tap} from "rxjs/operators";
import {Subject} from "rxjs";


@Component({
  selector: 'app-admin-slider',
  templateUrl: './admin-slider.component.html',
  styleUrls: ['./admin-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdminSliderComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public sliderData: SliderData[] = [];
  public isChangedSliderDataOrder = false;

  constructor(private sliderService: SliderService,
              private location: Location,
              private cdr: ChangeDetectorRef,) { }

  ngOnInit(): void {
    this.init()
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private init(){
    this.sliderService.getSliderDataSortByOrder().pipe(
      tap((res: SliderData[]) => {
        if(!res){return}
        this.sliderData = res;
        this.cdr.markForCheck();
      }),
      takeUntil(this.destroy$)
    ).subscribe()
  }



  public dropSlide(event: CdkDragDrop<SliderData[]>) {
    moveItemInArray(this.sliderData, event.previousIndex, event.currentIndex);
    this.isChangedSliderDataOrder = true
  }



  public saveToReorder(){
    if(this.sliderData.length > 0){
      this.sliderData.map((slide:SliderData, index:number) => {
        slide.order = index + 1
        const timeout = slide.order * 1000;
        setTimeout(() => {
          this.sliderService.editSlideData(slide.id, slide).pipe(
            tap(res => {
              console.log(res)
            })
          ).subscribe()
        },timeout)

      })
      this.cdr.markForCheck();
    }
  }

  public onHovering(event: Event){
    console.log(event)
  }

  public onUnovering(event: Event){
    console.log(event)
  }


  public comeBack(){
    this.location.back()
  }

}
