import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(private httpService: HttpService) { }


  ourTeam: { id: number, name: string, designation: string, image: string }[]


  aboutUsDetails: {
    id: number,
    title: string,
    description: string,
    image: string,
    founded: number,
    product_sold: number,
    best_review: number
  }
  apiUrl = 'https://api.bharatmatcompany.com'



  ngOnInit(): void {
    this.httpService.getAboutUsDetails().subscribe((res: {
      id: number,
      title: string,
      description: string,
      image: string,
      founded: number,
      product_sold: number,
      best_review: number
    }) => {
      this.aboutUsDetails = res
    })

    this.httpService.getOurTeam('/api/ourteam/').subscribe((res: { id: number, name: string, designation: string, image: string }[]) => {
      this.ourTeam = res
    });

  }
  productSoldCounter: number = 0;
  productSoldStop: any = setInterval(() => {
    this.productSoldCounter++;
    if (this.productSoldCounter == this.aboutUsDetails.product_sold) {
      clearInterval(this.productSoldStop);
    }
  });

  bestReviewCounter:number=0;
  bestReviewStop:any=setInterval(()=>{
    this.bestReviewCounter++;
    if (this.bestReviewCounter == this.aboutUsDetails.best_review) {
      clearInterval(this.bestReviewStop);
    }
  },20)

}
