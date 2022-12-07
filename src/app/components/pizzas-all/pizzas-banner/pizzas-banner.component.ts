import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-pizzas-banner',
  templateUrl: './pizzas-banner.component.html',
  styleUrls: ['./pizzas-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzasBannerComponent implements OnInit {

  private imgList: any[] = [
    {
      "previewImageSrc": "https://media.dominos.ua/slider/slide_image/2022/11/16/Panasia_Slider_PC_UKR.jpg",
      "thumbnailImageSrc": "demo/images/galleria/galleria1s.jpg",
      "alt": "Description for Image 1",
      "title": "Title 1"
    },
    {
      "previewImageSrc": "https://media.dominos.ua/slider/slide_image/2022/11/10/SLIDER-PANASIA_PIZZAS-02.11.22-UKR_1280x488_pix.jpg",
      "thumbnailImageSrc": "demo/images/galleria/galleria2s.jpg",
      "alt": "Description for Image 2",
      "title": "Title 2"
    },
    {
      "previewImageSrc": "https://media.dominos.ua/slider/slide_image/2022/09/01/slider_ukr.jpg",
      "thumbnailImageSrc": "demo/images/galleria/galleria3s.jpg",
      "alt": "Description for Image 3",
      "title": "Title 3"
    },
    {
      "previewImageSrc": "https://media.dominos.ua/slider/slide_image/2022/09/01/SLIDER-NEW_LARGE_POTATO_BOX-29.08.22-UKR_1280x488_pix.jpg",
      "thumbnailImageSrc": "demo/images/galleria/galleria4s.jpg",
      "alt": "Description for Image 4",
      "title": "Title 4"
    }
  ];

  public images = this.imgList

  responsiveOptions:any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
