import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent implements OnInit {

  @ViewChild('minSlidePr', { static: true }) minSlidePr: ElementRef;
  @ViewChild('maxSlidePr', { static: true }) maxSlidePr: ElementRef;
  @ViewChild('progressBarStylePriceRange', { static: true }) progressBarStylePriceRange: ElementRef;


  @ViewChild('maxSlideDiscount', { static: true }) maxSlideDiscount: ElementRef;
  @ViewChild('minSlideDiscount', { static: true }) minSlideDiscount: ElementRef;
  @ViewChild('progressBarStyleDiscount', { static: true }) progressBarStyleDiscount: ElementRef;



  categories: { id: number, title: string, image: string }[];

  maxValuePr: number;
  minValuePr: number;

  minValueDiscount: number;
  maxValueDiscount: number;

  catArray = [];

  catEle;

  priceGapPr = 1000;
  priceGapDiscount = 30;

  constructor(private apiServ: HttpService, private Arout: ActivatedRoute, private router: Router) { }
  id
  autoSelect = true
  cow = false
  gym = false
  animal = false
  ngOnInit() {
    this.id = this.Arout.snapshot.paramMap.get('id')
    if (this.id == 1) {
      this.cow = true
      this.gym = false
      this.animal = false
    }
    if (this.id == 2) {
      this.gym = true
      this.cow = false
      this.animal = false
    }
    if (this.id == 3) {
      this.animal = true
      this.gym = false
      this.cow = false
    }
    this.apiServ.getCategoryFilter('/api/category/').subscribe((res: { id: number, title: string, image: string }[]) => {
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
    if (this.id) {
      this.applytheFilter()
    }

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
    console.log(id);


    if (index == -1) {
      this.catArray.push(id)
    }
    if (index != -1) {
      this.catArray.splice(index, 1)
    }
  }

  applytheFilter() {
    if (this.id) {
      let filterData = {
        category: `[${this.id}]`,
        min_price: +this.minValuePr,
        max_price: +this.maxValuePr,
        min_discount: +this.minValueDiscount,
        max_discount: +this.maxValueDiscount
      }
      this.apiServ.productFilter('/api/products_filter/', filterData)

    } else {
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

  appyfilter2() {
    this.autoSelect = false
    let filterData = {
      category: `[${this.catArray}]`,
      min_price: +this.minValuePr,
      max_price: +this.maxValuePr,
      min_discount: +this.minValueDiscount,
      max_discount: +this.maxValueDiscount
    }
    this.apiServ.productFilter('/api/products_filter/', filterData)
    if (this.id == 1) {
      this.cow = false
    }
    if (this.id == 2) {
      this.gym = false
    }
    if (this.id == 3) {
      this.animal = false
    }
  }


}
