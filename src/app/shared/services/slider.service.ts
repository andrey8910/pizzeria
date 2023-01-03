import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SliderData} from "../interfaces/slider-data";
import {environment} from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(private httpClient: HttpClient) { }

  getSliderData(){
    return this.httpClient.get<SliderData[]>(environment.urlSliderData)
  }

  getSlideById(slideId:number){
    return this.httpClient.get<SliderData>(`${environment.urlSliderData}/${slideId}`)
  }

  getSliderDataSortByOrder(){
    return this.httpClient.get<SliderData[]>(`${environment.urlSliderData}?_sort=order&_order=asc`)
  }

  editSlideData(slideId: number, slideData: SliderData){
    return this.httpClient.put<SliderData>(`${environment.urlSliderData}/${slideId}`, slideData)
  }
}
