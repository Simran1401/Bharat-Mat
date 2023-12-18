import { Component, OnInit } from '@angular/core';
import { reviewHolders } from 'src/app/models/review.modal';
import { HomeSlideNineService } from 'src/app/services/home.slideNine.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home-section-nine',
  templateUrl: './home-section-nine.component.html',
  styleUrls: ['./home-section-nine.component.css']
})


export class HomeSectionNineComponent implements OnInit {

  constructor(private reviewSlide: HomeSlideNineService, private apiService: HttpService) {

  }

  reviews: reviewHolders[] = []
  apiUrl = 'https://api.bharatmatcompany.com';
  customer;
  title;
  description;

  // slideConfig = {
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   autoplay: false,
  //   dots: true,
  //   centre: true,
  //   margin: 10,
  //   prevArrow: false,
  //   nextArrow: false,
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
    this.apiService.getReviews().subscribe((res: reviewHolders[]) => {
      this.reviews = res
    });
    this.customerSay();
  }
  customerSay() {
    this.apiService.sayCutomer().subscribe(res => {
      this.customer = res
      this.title = this.customer[0].title
      this.description = this.customer[0].description
    });
  }
}
