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
  public showSlideEditor = false;
  public showAddNewSlide = false;
  public editSlideData: SliderData


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
            }),
            takeUntil(this.destroy$)
          ).subscribe()
        },timeout)

      })
      this.cdr.markForCheck();
    }
  }

  public deleteSlide(slide: any){
    console.log(slide)
  }

  public editSlide(slideId: any){
    this.showSlideEditor = true;
    this.showAddNewSlide = false;

    this.sliderService.getSlideById(slideId).pipe(
      tap((res: SliderData) => {
        this.editSlideData = res
        this.cdr.markForCheck();
      }),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  public cancelEdit(){
    this.showSlideEditor = false
  }
  public cancelAddSlide(){
    this.showAddNewSlide = false
  }

  public addNewSlide(data: any){
    const newSlideData : SliderData = {
      id: 0,
      order: this.sliderData.length + 1,
      title: data.title,
      alt: data.alt,
      previewImageSrc: data.imgSrc
    }

    this.sliderService.addSlideData(newSlideData).pipe(
      tap(() => {
        this.init()
      }),
      takeUntil(this.destroy$)
    ).subscribe()
  }


  public comeBack(){
    this.location.back()
  }

}
