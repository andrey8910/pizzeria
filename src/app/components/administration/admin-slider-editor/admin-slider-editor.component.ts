import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {SliderData} from "../../../shared/interfaces/slider-data";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidateUrl} from "../../../shared/Validators";



@Component({
  selector: 'app-admin-slider-editor',
  templateUrl: './admin-slider-editor.component.html',
  styleUrls: ['./admin-slider-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSliderEditorComponent implements OnInit {

  @Input() slideData: SliderData | null;
  @Output() cancelEdit = new EventEmitter();
  @Output() saveNewSlideData = new EventEmitter();
  public formEditorSlideData: FormGroup;

  constructor( private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.init();
  }

  private init(){
    this.formEditorSlideData = new FormGroup<any>({
      title: new FormControl('', [Validators.required,Validators.minLength(1), Validators.maxLength(12)]),
      alt: new FormControl('', [Validators.required,Validators.minLength(1), Validators.maxLength(22)]),
      imgSrc: new FormControl('',[Validators.required, ValidateUrl])
    })
    this.cdr.markForCheck();
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

}
