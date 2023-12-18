import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { slideShowImage } from 'src/app/models/slideShowHomeOne.modal';
import { HomeSlideOneService } from 'src/app/services/home.slideSeven.service';
import { HttpService } from 'src/app/services/http.service';
// import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home-section-seven',
  templateUrl: './home-section-seven.component.html',
  styleUrls: ['./home-section-seven.component.css']
})
export class HomeSectionSevenComponent implements OnInit, AfterViewInit {


  constructor(
    private homeSlideShowService: HomeSlideOneService,
    private httpService: HttpService,
    private renderer: Renderer2,
    private el: ElementRef) { }

  slideShowSides: slideShowImage[] = [];
  rotatory = [];

  // slideConfig = {
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   autoplay: false,
  //   dots: true,
  //   autoplaySpeed: 5000,
  //   responsive: [
  //     {
  //       breakpoint: 767,
  //       settings: {
  //         slidesToShow: 1,
  //         slideToScroll: 1
  //       }
  //     }
  //   ]
  // };

  ngOnInit() {

    // this.slideShowSides = this.homeSlideShowService.getImages();

    this.httpService.gethowOurProductWorks().subscribe((res: slideShowImage[]) => {

      this.slideShowSides = res

      this.slideShowSides.find(res => {
        res.id,
        this.rotatory.push(res.id)
      })
    })


  }

  ngAfterViewInit() {
  }

  swiped($event: TouchEvent, when: string, device: string) {
    if (when === 'start') {
      this.startPosition = $event.changedTouches[0].clientX;
    } else {
      this.endPosition = $event.changedTouches[0].clientX;
      if (this.endPosition - this.startPosition < -30) this.rotate(1, device);
      if (this.endPosition - this.startPosition > 30) this.rotate(0, device);
    }
  }

  private startPosition = 0;
  private endPosition = 0;

  // rotateLeft => direction = 1 else direction = 0
  rotate(direction: number, device: string) {
    let imgDivs: HTMLElement[] = this.el.nativeElement.querySelectorAll(`.images-${device}-container > div`);
    let n = imgDivs.length;
    // console.log(imgDivs);
    let step = direction ? n - 1 : 1;
    // console.log(step)
    for (let i of imgDivs) {
      let prevClass = +i.className[i.className.search(/img/) + 4];
      let currIndex = this.rotatory.indexOf(prevClass);
      let nextClass = this.rotatory[(currIndex + step) % n];
      i.className = i.className.replace(`img-${prevClass}`, `img-${nextClass}`);
    }
  }


  // customOptions: OwlOptions = {
  //   loop:true,
  //   margin:10,
  //   center:true,
  //   nav:true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: true,
  //   rewind: true,
  //   // autoplay: true,
  //   navText:[
  //     "<i class='fa fa-angle-left'></i>",
  //     "<i class='fa fa-angle-right'></i>"
  //   ],
  //   responsive:{
  //       0:{
  //           items:1,
  //       },
  //       600:{
  //           items:3,
  //       },
  //       1000:{
  //           items:3,

  //       }
  //   }
  // }


}
