import { Injectable } from "@angular/core";
import { reviewHolders } from "../models/review.modal";

@Injectable({ providedIn: 'root' })

export class HomeSlideNineService {

  private reviews: reviewHolders[] = [
    // new reviewHolders(
    //   'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur cupiditate sit consectetur adipisci, commodi inventore.',
    //   '../../../assets/images/home_images/Ellipse 1.png',
    //   'Lorem Ipsum'
    // ),
    // new reviewHolders(
    //   'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur cupiditate sit consectetur adipisci, commodi inventore.',
    //   '../../../assets/images/home_images/Ellipse 2.png',
    //   'Lorem Ipsum'
    // ),
    // new reviewHolders(
    //   'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur cupiditate sit consectetur adipisci, commodi inventore.',
    //   '../../../assets/images/home_images/Ellipse 3.png',
    //   'Lorem Ipsum'
    // )
  ]

  getReviews() {
    return this.reviews.slice()
  }

}
