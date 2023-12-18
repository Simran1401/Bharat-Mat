import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpService } from '../services/http.service';


@Component({
  selector: 'app-our-products',
  templateUrl: './our-products.component.html',
  styleUrls: ['./our-products.component.css']
})
export class OurProductsComponent implements OnInit {

  constructor(private renderer: Renderer2,  private apiServ: HttpService) { }


  @ViewChild('minSlidePr', { static: true }) minSlidePr: ElementRef;
  @ViewChild('maxSlidePr', { static: true }) maxSlidePr: ElementRef;
  @ViewChild('progressBarStylePriceRange', { static: true }) progressBarStylePriceRange: ElementRef;


  @ViewChild('maxSlideDiscount', { static: true }) maxSlideDiscount: ElementRef;
  @ViewChild('minSlideDiscount', { static: true }) minSlideDiscount: ElementRef;
  @ViewChild('progressBarStyleDiscount', { static: true }) progressBarStyleDiscount: ElementRef;


  maxValuePr: number;
  minValuePr: number;

  minValueDiscount: number;
  maxValueDiscount: number;
  priceGapPr = 1000;
  priceGapDiscount = 30;

  catArray = [];


  categories: { id: number, title: string, image: string }[];

  ngOnInit(): void {
    this.apiServ.getCategoryFilter('/api/category/').subscribe( (res: { id: number, title: string, image: string }[]) => {
      this.categories = res
    })


    let percentageOfMin = -1.5 + (this.minSlidePr.nativeElement.value / this.minSlidePr.nativeElement.max) * 100;
    this.progressBarStylePriceRange.nativeElement.style.left = percentageOfMin + '%';
    this.minValuePr = this.minSlidePr.nativeElement.value;


    let percentageOfMax = 101 - (this.maxSlidePr.nativeElement.value / this.maxSlidePr.nativeElement.max) * 100;
    this.progressBarStylePriceRange.nativeElement.style.right = percentageOfMax + '%';
    this.maxValuePr = this.maxSlidePr.nativeElement.value;

    let percentageOfMaxDiscount = 101 - (this.maxSlideDiscount.nativeElement.value / this.maxSlideDiscount.nativeElement.max) * 100;
    this.progressBarStyleDiscount.nativeElement.style.right = percentageOfMaxDiscount + '%'
    this.maxValueDiscount = this.maxSlideDiscount.nativeElement.value;

    let percentageOfMinDiscount = (this.minSlideDiscount.nativeElement.value / this.minSlideDiscount.nativeElement.max) * 100;
    this.progressBarStyleDiscount.nativeElement.style.left = percentageOfMinDiscount + '%'
    this.minValueDiscount = this.minSlideDiscount.nativeElement.value;
  }



  ChangingWidthOfPriceRange(e: Event) {

    if (this.maxSlidePr.nativeElement.value - this.minSlidePr.nativeElement.value < this.priceGapPr) {
      this.minSlidePr.nativeElement.value = this.maxSlidePr.nativeElement.value - this.priceGapPr
    };
    if (this.maxSlidePr.nativeElement.value - this.minSlidePr.nativeElement.value <= this.priceGapPr) {
      this.maxSlidePr.nativeElement.value = +this.minSlidePr.nativeElement.value + +this.priceGapPr;
    };
    this.minValuePr = this.minSlidePr.nativeElement.value;
    let percentageOfMin = (this.minSlidePr.nativeElement.value / this.minSlidePr.nativeElement.max) * 100;
    this.progressBarStylePriceRange.nativeElement.style.left = percentageOfMin - 1.5 + '%';

    this.maxValuePr = this.maxSlidePr.nativeElement.value;
    let percentageOfMax = 101 - (this.maxSlidePr.nativeElement.value / this.maxSlidePr.nativeElement.max) * 100;
    this.progressBarStylePriceRange.nativeElement.style.right = percentageOfMax + '%';

  }



  ChangingWidthOfDiscount(e: Event) {
    if (this.maxSlideDiscount.nativeElement.value - this.minSlideDiscount.nativeElement.value < this.priceGapDiscount) {
      this.maxSlideDiscount.nativeElement.value = +this.minSlideDiscount.nativeElement.value + +this.priceGapDiscount
    };
    this.maxValueDiscount = this.maxSlideDiscount.nativeElement.value;
    let percentageOfMaxDiscount = 101 - (this.maxSlideDiscount.nativeElement.value / this.maxSlideDiscount.nativeElement.max) * 100;
    this.progressBarStyleDiscount.nativeElement.style.right = percentageOfMaxDiscount + '%'

    if (this.maxSlideDiscount.nativeElement.value - this.minSlideDiscount.nativeElement.value < this.priceGapDiscount) {
      this.minSlideDiscount.nativeElement.value = +this.maxSlideDiscount.nativeElement.value - +this.priceGapDiscount
    };
    this.minValueDiscount = this.minSlideDiscount.nativeElement.value;
    let percentageOfMinDiscount = (this.minSlideDiscount.nativeElement.value / this.minSlideDiscount.nativeElement.max) * 100;
    this.progressBarStyleDiscount.nativeElement.style.left = percentageOfMinDiscount + '%'

  }


  gettingId(id) {

    let index = this.catArray.indexOf(id)

    if ( index == -1) {
      this.catArray.push(id)
    }
    if(index != -1) {
      this.catArray.splice(index, 1)
    }
  }

  applytheFilter() {

    let filterData = {
      category: `[${this.catArray}]`,
      min_price: +this.minValuePr,
      max_price: +this.maxValuePr,
      min_discount: +this.minValueDiscount,
      max_discount: +this.maxValueDiscount
    }
    this.apiServ.productFilter('/api/products_filter/', filterData)

  
  }


}
