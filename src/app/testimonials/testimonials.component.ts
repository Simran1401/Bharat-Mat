import { Component, OnInit } from '@angular/core';
import { reviewHolders } from '../models/review.modal';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {

  constructor(private apiService: HttpService) { }

  apiUrl = 'https://api.bharatmatcompany.com'
  reviews: reviewHolders[] = []

  ngOnInit() {
    this.apiService.getReviews().subscribe((res: reviewHolders[]) => {
      this.reviews = res
      
    })
  }

}
