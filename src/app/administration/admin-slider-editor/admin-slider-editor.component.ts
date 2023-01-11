import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output, SimpleChanges
} from '@angular/core';
import {SliderData} from "../../core/interfaces/slider-data";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidateUrl} from "../../core/Validators";



@Component({
  selector: 'app-admin-slider-editor',
  templateUrl: './admin-slider-editor.component.html',
  styleUrls: ['./admin-slider-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSliderEditorComponent implements OnInit, OnChanges {

  @Input() slideData: SliderData | null;
  @Output() cancelEdit = new EventEmitter();
  @Output() saveNewSlideData = new EventEmitter();
  @Output() saveEditSlideData = new EventEmitter();
  public formEditorSlideData: FormGroup;

  constructor( private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.slideData && this.formEditorSlideData){
      this.formEditorSlideData.controls['title'].setValue(this.slideData.title);
      this.formEditorSlideData.controls['alt']?.setValue(this.slideData.alt);
      this.formEditorSlideData.controls['imgSrc']?.setValue(this.slideData.previewImageSrc);
    }
  }


  private init(){
    this.formEditorSlideData = new FormGroup<any>({
      title: new FormControl('', [Validators.required,Validators.minLength(1), Validators.maxLength(22)]),
      alt: new FormControl('', [Validators.required,Validators.minLength(1), Validators.maxLength(32)]),
      imgSrc: new FormControl('',[Validators.required, ValidateUrl])
    })
  }

  public cancel(){
    this.formEditorSlideData.reset();
    this.cancelEdit.emit();
    this.cdr.markForCheck();
  }

  public saveNewSlide(formValue: any){
    this.saveNewSlideData.emit(formValue);
    this.formEditorSlideData.reset();
  }

  public saveEditSlide(formData: any){
    if(this.slideData){
      const editDataSlide : SliderData = {
        id: this.slideData.id,
        order: this.slideData.order,
        title: formData.title,
        alt: formData.alt,
        previewImageSrc: formData.imgSrc
      }
      this.saveEditSlideData.emit(editDataSlide)
    }

  }

}
