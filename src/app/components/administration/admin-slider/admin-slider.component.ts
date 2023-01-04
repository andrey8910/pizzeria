import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {SliderData} from "../../../shared/interfaces/slider-data";
import {SliderService} from "../../../shared/services/slider.service";
import {finalize, takeUntil, tap} from "rxjs/operators";
import {Subject} from "rxjs";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";


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
              private cdr: ChangeDetectorRef,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,) { }

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
            takeUntil(this.destroy$)
          ).subscribe()
        },timeout)

      })
      this.cdr.markForCheck();
    }
  }

  public deleteSlide(slideId: number){
    this.confirmationService.confirm({
      message: `Ви впевнені, що хочете видалити слайд з переліку зображень слайдера?`,
      header: 'Видалення слайду',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.sliderService.deleteSlide(slideId).pipe(
          takeUntil(this.destroy$),
          tap(res => {
            this.cdr.markForCheck();
            if(res){
              this.messageService.add({severity:'info', summary:'Підтверджено', detail:`Дані слайду видалено `});
            }
          }),
          finalize(() =>   {
            this.init();
          })
        ).subscribe()
      },
      reject: (type: any) => {
        switch(type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({severity:'error', summary:'Відміна', detail:'Видалення відмінено'});
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({severity:'warn', summary:'Скасування', detail:'Операція скасована'});
            break;
        }
      }
    });
  }

  public editSlide(slideId: number){
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

  public saveEditSlideData(slideData: SliderData){
    this.sliderService.editSlideData(slideData.id, slideData).pipe(
      tap(() => this.init()),
      finalize(() => {
        this.messageService.add({severity:'success', summary:'Успішно!', detail:'Дані слайду змінені !'});
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
      finalize(() => {
        this.messageService.add({severity:'success', summary:'Успішно!', detail:'Створено новій слайд !'});
        this.cdr.markForCheck();
      }),
      takeUntil(this.destroy$)
    ).subscribe()
  }


  public comeBack(){
    this.location.back()
  }

}
