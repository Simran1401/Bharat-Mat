import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductDepthDetails } from 'src/app/models/productDepthDetailsModal';
import { HttpService } from 'src/app/services/http.service';
import { productService } from 'src/app/services/product-list.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  constructor(
    private apiServ: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: productService,
    private toastr: ToastrService
  ) {
    console.log(this.router.getCurrentNavigation().extras.state?.['example']);

  
  }

  LogInModalOpen: boolean = false;
  res;
  added: boolean = false;
  id: number;
  Products;
  apiUrl = 'https://api.bharatmatcompany.com';

  prodQuant: number = 1;
  reviewForm: FormGroup;

  addreviewSec: boolean;

  addedToList: boolean;

  @ViewChild('starsOne', { static: false }) starsOne: ElementRef;
  @ViewChild('starsTwo', { static: false }) starsTwo: ElementRef;
  @ViewChild('starsThree', { static: false }) starsThree: ElementRef;
  @ViewChild('starsFour', { static: false }) starsFour: ElementRef;
  @ViewChild('starsFive', { static: false }) starsFive: ElementRef;

  reviewStarSelected;
  errorMessege;
  successMessege;

  ProductsInCart;

  prodInCart;
  image1
  image2
  image3
  image4
  ngOnInit() {
    // this.id = this.activatedRoute.snapshot.params['id']

    let pid = JSON.parse(localStorage.getItem('pId'));
    console.log(pid);

    if (pid) {
      this.id = pid
    } else {
      this.id = this.router.getCurrentNavigation().extras.state?.['example']
    }

    
    this.addreviewSec = false;

    this.reviewForm = new FormGroup({
      reviewName: new FormControl(null, Validators.required),
      reviewDesc: new FormControl(null, Validators.required)
    })
    if (localStorage.getItem('userToken')) {
      this.apiServ.authProductPage(`/api/productdetail/?id=${this.id}`).subscribe((res: any) => {
        this.Products = res;
        this.image1 = this.Products[0].image1
        this.image2 = this.Products[0].image2
        this.image3 = this.Products[0].image3
        this.image4 = this.Products[0].image4;

        //  
        this.image_2 = this.Products[0].image1;
        this.image_3 = this.Products[0].image1;
        this.image_4 = this.Products[0].image1;


      }, err => {
        console.log(err.error.detail);
        if (err.error.detail == 'Invalid token.') {
          this.apiServ.getProductPage(`/api/productdetail/?id=${this.id}`).subscribe((res: any) => {
            this.Products = res;
            this.image1 = this.Products[0].image1
            this.image2 = this.Products[0].image2
            this.image3 = this.Products[0].image3
            this.image4 = this.Products[0].image4;
            //  
            this.image_2 = this.Products[0].image1;
            this.image_3 = this.Products[0].image1;
            this.image_4 = this.Products[0].image1;
          })
        }
      })
    } else {
      this.apiServ.getProductPage(`/api/productdetail/?id=${this.id}`).subscribe((res: any) => {
        this.Products = res;
        this.image1 = this.Products[0].image1
        this.image2 = this.Products[0].image2
        this.image3 = this.Products[0].image3
        this.image4 = this.Products[0].image4;

        //  
        this.image_2 = this.Products[0].image1;
        this.image_3 = this.Products[0].image1;
        this.image_4 = this.Products[0].image1;


      })
    }
    this.productService.productList.subscribe(() => {
      try {
        if (JSON.parse(localStorage.getItem("cart"))) {
          this.ProductsInCart = JSON.parse(localStorage.getItem("cart"));
        }

        if (this.ProductsInCart[this.id]) {
          this.addedToList = true;

        } else {
          this.addedToList = false;
        }

      } catch { }

    })


  }
  //
  display = "none";

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  //
  addReview() {
    this.apiServ.User.subscribe(permission => {
      if (permission) {
        this.addreviewSec = true;
      } else {
        this.LogInModalOpen = true
      }
    })
  }

  decreaseValue(p, product) {
    this.productService.decrease(p);

    let cartInLocal = JSON.parse(localStorage.getItem('cart'));


    if (cartInLocal[this.id].quantity < product.min_order_qty) {
      this.productService.removeItem(p)
    }

    if (!cartInLocal[this.id]) {
      this.addedToList = false
    }
  }

  increaseValue(p) {
    this.productService.increase(p)
  }

  clickStar(e) {
    this.reviewStarSelected = e.value
  }

  onSubmit() {

    var data = {
      product_id: this.id,
      name: this.reviewForm.controls['reviewName'].value,
      rate: this.reviewStarSelected,
      description: this.reviewForm.controls['reviewDesc'].value
    }
    if (!this.reviewForm.valid || data.rate == undefined) {
      this.errorMessege = 'Please fill the details'
      if (this.errorMessege = 'Please fill the details') {
        setTimeout(() => {
          this.errorMessege = null
        }, 3000);
      }
      this.successMessege = null
    } else {
      this.successMessege = 'Thank you for your review. We value your feedback and are always looking for ways to improve'

      this.toastr.success(this.successMessege)

      var clicking = <HTMLElement>document.querySelector('.btn-close')
      clicking?.click()
      // if (this.successMessege = 'Thank you for your review. We value your feedback and are always looking for ways to improve ') {
      //   setTimeout(() => {
      //     this.successMessege = null

      //     var clicking = <HTMLElement>document.querySelector('.btn-close')
      //     clicking?.click()
      //   }, 3000);
      // }
      this.errorMessege = null

      this.reviewForm.reset()
      this.starsOne.nativeElement.checked = false
      this.starsTwo.nativeElement.checked = false
      this.starsThree.nativeElement.checked = false
      this.starsFour.nativeElement.checked = false
      this.starsFive.nativeElement.checked = false
      // console.log(this.Products[0].reviews.push({ user_name: data.name, rate: data.rate, description: data.description }));
      this.apiServ.addReview('/api/addreviewonproduct/', data).subscribe({
        next(res) {
          // console.log(res);
        },
        error(err) {
          // console.log(err)
        },
        complete() {
          this.reviewStarSelected = undefined;
        }
      })
    }

  }

  NavToCartPage(P) {
    this.apiServ.User.subscribe(permission => {
      // console.log(permission)
      if (permission) {
        if (P.min_order_qty == 'None' || P.min_order_qty == 0) {
          this.productService.sendDataToCart(P, this.prodQuant)
        } else {
          this.productService.sendDataToCart(P, +P.min_order_qty)
        }

        this.added = true
        this.router.navigate(['/cart-component']);
      } if (!permission) {
        this.LogInModalOpen = true
      }
    })
  }

  addToCart(P) {
    this.apiServ.User.subscribe(permission => {
      if (permission) {
        this.added = true
        if (P.min_order_qty == "None" || P.min_order_qty == 0) {
          this.productService.sendDataToCart(P, this.prodQuant)
        } else {
          this.productService.sendDataToCart(P, +P.min_order_qty)
        }
      } if (!permission) {
        this.LogInModalOpen = true
      }
    })

  }

  backDropClicked(e: boolean) {
    this.LogInModalOpen = e;
  }

  img2 = true
  img_2 = false
  img3 = true
  img_3 = false
  img4 = true
  img_4 = false
  image_2
  image_3
  image_4

  displayImg1() {
    this.image1 = this.image2;
    this.img4 = true;
    this.img_4 = false;
    this.img3 = true;
    this.img_3 = false;
    //
    this.img2 = false;
    this.img_2 = true;


  }
  displayImg2() {
    this.image1 = this.image3;
    //
    this.img2 = true;
    this.img_2 = false;
    this.img4 = true;
    this.img_4 = false;
    //
    this.img3 = false;
    this.img_3 = true;
  }
  displayImg3() {
    this.image1 = this.image4
    //
    this.img2 = true;
    this.img_2 = false;
    this.img3 = true;
    this.img_3 = false;
    //
    this.img4 = false;
    this.img_4 = true;
  }


  displayImg_1() {
    this.image1 = this.image_2
    this.img2 = true
    this.img_2 = false
  }
  displayImg_2() {
    this.image1 = this.image_3
    this.img3 = true
    this.img_3 = false
  }
  displayImg_3() {
    this.image1 = this.image_4
    this.img4 = true
    this.img_4 = false
  }
}
