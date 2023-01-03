import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {SliderData} from "../../../shared/interfaces/slider-data";

@Component({
  selector: 'app-admin-slider-item',
  templateUrl: './admin-slider-item.component.html',
  styleUrls: ['./admin-slider-item.component.scss']
})
export class AdminSliderItemComponent implements OnInit {
  public showSlideControlsBtn = false;

  @Input() sliderItem: SliderData;
  @Output() deleteIdem = new EventEmitter();
  @Output() editIdem = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onHovering(){
    this.showSlideControlsBtn = true

  }

  public onUnovering(){
    this.showSlideControlsBtn = false

  }

  public deleteSlide(){
    this.deleteIdem.emit(this.sliderItem.id)
  }

  public editSlide(){
    this.editIdem.emit(this.sliderItem.id)
  }

}
