import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, DoCheck, OnInit, Renderer2, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RecaptchaComponent } from 'ng-recaptcha';
import { ToastrService } from 'ngx-toastr';
import { Products } from '../models/product.modal';
import { reviewHolders } from '../models/review.modal';
import { slideShowImage } from '../models/slideShowHomeOne.modal';
import { HttpService } from '../services/http.service';
import { productService } from '../services/product-list.service';
import { returnAndOrder } from '../services/ordersAndReturn';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {


  contactForm: UntypedFormGroup;
  errorMessage: string;
  successMessage: string;

  private token = '';
  // siteKey = '6LdH828iAAAAAAfOlmrpBpGtsAAhwOxPPYl6WR_K'
  siteKey = '6LfKB0kjAAAAACtoXcjxzceesZePlD3CHJCY491h'
  @ViewChild('captcha') captcha!: RecaptchaComponent;

  apiUrl = 'https://api.bharatmatcompany.com'

  products: Products[];
  LogInModalOpen: boolean = false;

  sectionOneDetails;

  secondSectionHead: { id: number, title: string, description: string, };

  secondSectionItems: { id: number, title: string, image: string, description: string }[];

  becomADealerDetails: { id: number, title: string, description: string, image: string };

  offerSectionDetails: { id: number, title: string, description: string, image };

  aboutUsDetails

  // reviews: { id: number, title: string, description: string, designation: string }

  mapLink;
  nine = true
  constructor(private apiService: HttpService, private renderer: Renderer2, private router: Router, private sanitizer: DomSanitizer, private productService: productService,
    private toastr: ToastrService,
    private orderReturnServ: returnAndOrder,
    
  ) {

    // this.apiService.getFooterDetails().subscribe((res: any) => {
    //   this.mapLink = this.sanitizer.bypassSecurityTrustResourceUrl(res.address_link)
    //   this.nine = true
    // })
  }

  slideConfig = {
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    dots: true,
    prevArrow: false,
    nextArrow: false,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slideToScroll: 1
        }
      }
    ]
  };
  public ProductsInCart;
  allProduct = []
  idd
  rotatory = [];
  slideShowSides: slideShowImage[] = [];

  reviews: reviewHolders[] = []

  customer;
  title;
  description;
  banner = []

  count1 = 0;
  count2 = 0;
  count3 = 0;
  count4 = 0;
  count5 = 0;
  count6 = 0;
  count7 = 0;
  loader = true;
  map = false

  ngOnInit() {

    const javaScriptForHeadAndFoot = this.renderer.createElement('script');
    javaScriptForHeadAndFoot.src = `../../assets/javaScripts/captcha.js`;
    this.renderer.appendChild(document.head, javaScriptForHeadAndFoot);




    this.contactForm = new UntypedFormGroup({
      name: new UntypedFormControl('', Validators.required),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      phone_number: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      message: new UntypedFormControl('', Validators.required)
    })
    this.getMap();
    this.getBanner();
    this.getWhatLookingFor();
    // this.getBecomeDealer();
    // this.getProduct()
    // this.getOffer()
    // this.getAbout()
    this.getProductWork()
    this.getTestimonial()
    // this.customerSay() - api not working so comented
console.log('');

    window.addEventListener('scroll', (event) => {
      if (this.count4 == 0) {
        if (window.scrollY > 5) {
          this.getAbout();
          this.count4++;
        }
      }
    });
    window.addEventListener('scroll', (event) => {
      if (this.count3 == 0) {
        if (window.scrollY > 20) {
          this.getBecomeDealer();
          this.count3++;
        }
      }
    });
    window.addEventListener('scroll', (event) => {
      if (this.count5 == 0) {
        if (window.scrollY > 50) {
          this.getTestimonial();
          this.count5++;
        }
      }
    });
    window.addEventListener('scroll', (event) => {
      if (this.count1 == 0) {
        if (window.scrollY > 150) {
          this.getProduct();
          this.count1++;
        }
      }
    });
    window.addEventListener('scroll', (event) => {
      if (this.count2 == 0) {
        if (window.scrollY > 200) {
          this.getOffer();
          this.count2++;
        }
      }
    });
  }


  show = true
  getBanner() {

    this.apiService.getBanner().subscribe(res => {
      this.sectionOneDetails = res;
      this.loader = false
      if (this.sectionOneDetails.length == 1) {
        this.show = false
      }

      this.banner.push(res)
    })
  }
  second = true
  getWhatLookingFor() {
    this.apiService.getWhatAreYouLookingFor().subscribe((res: {
      are_you_looking_for: { id: number, title: string, description: string },
      category: { id: number, title: string, image: string, description: string }[]
    }) => {
      this.secondSectionHead = res.are_you_looking_for;
      this.secondSectionItems = res.category;
      this.second = false
    })
  }
  fourth = true
  getBecomeDealer() {
    this.apiService.getBecomeADealerDetails().subscribe((res: { id: number, title: string, description: string, image: string }) => {
      this.becomADealerDetails = res;
      this.fourth = false
    })
  }
  cart: Boolean
  quantity
  fifth = true
  getProduct() {
    if (localStorage.getItem('userToken')) {
      // this.apiService.authProduct().subscribe({
      //   next: (res: Products[]) => {


      //     this.products = res
      //     this.allProduct = res
      //     this.fifth = false
      //     this.productService.productList.subscribe(() => {

      //       if ((localStorage.getItem("cart"))) {
      //         this.ProductsInCart = JSON.parse(localStorage.getItem("cart"));
      //       } else {
      //         this.ProductsInCart = false
      //       }
      //     })
      // this.allProduct.map((pr) => {
      //   if (this.ProductsInCart[pr.id]?.id == pr.id) {
      //     this.cart = true;
      //  this.quantity=this.ProductsInCart[pr.id]?.quantity
      //   }else{
      //     this.cart=false
      //   }
      // })
      //   }
      // })

      this.apiService.authProduct().subscribe((res: Products[]) => {
        this.products = res
        this.allProduct = res
        this.fifth = false
        this.productService.productList.subscribe(() => {

          if ((localStorage.getItem("cart"))) {
            this.ProductsInCart = JSON.parse(localStorage.getItem("cart"));
          } else {
            this.ProductsInCart = false
          }
        })
      }, err => {
        console.log(err.error.detail);
        if (err.error.detail == 'Invalid token.') {
          this.apiService.getOurProducts().subscribe({
            next: (res: Products[]) => {
              this.products = res
              this.allProduct = res
              this.fifth = false

              this.productService.productList.subscribe(() => {

                if ((localStorage.getItem("cart"))) {
                  this.ProductsInCart = JSON.parse(localStorage.getItem("cart"));

                } else {
                  this.ProductsInCart = false
                }

              })
              // this.allProduct.map((pr) => {
              //   if (this.ProductsInCart[pr.id]?.id == pr.id) {
              //     this.cart = true;
              //  this.quantity=this.ProductsInCart[pr.id]?.quantity
              //   }else{
              //     this.cart=false
              //   }
              // })
            }
          })
        }
      })
    } else {
      this.apiService.getOurProducts().subscribe({
        next: (res: Products[]) => {
          this.products = res
          this.allProduct = res
          this.fifth = false

          this.productService.productList.subscribe(() => {

            if ((localStorage.getItem("cart"))) {
              this.ProductsInCart = JSON.parse(localStorage.getItem("cart"));

            } else {
              this.ProductsInCart = false
            }

          })
          // this.allProduct.map((pr) => {
          //   if (this.ProductsInCart[pr.id]?.id == pr.id) {
          //     this.cart = true;
          //  this.quantity=this.ProductsInCart[pr.id]?.quantity
          //   }else{
          //     this.cart=false
          //   }
          // })
        }
      })
    }
  }
  seven = true
  getOffer() {
    this.apiService.getOffersDetails().subscribe((res: { id: number, title: string, description: string, image }) => {
      this.offerSectionDetails = res;
      this.seven = false
    })
  }
  third = true
  getAbout() {

    this.apiService.getAboutUsDetails().subscribe(res => {
      this.aboutUsDetails = res
      this.third = false
    })
  }
  six = true
  getProductWork() {
    this.apiService.gethowOurProductWorks().subscribe((res: slideShowImage[]) => {
      this.slideShowSides = res
      this.six = false
      this.slideShowSides.find(res => {
        res.id,
          this.rotatory.push(res.id)
      })


    })
  }
  eighth = true
  getTestimonial() {
    this.apiService.getReviews().subscribe((res: reviewHolders[]) => {
      this.reviews = res
      this.eighth = false
    });
  }
  addrssLink
  getMap() {
    this.apiService.getFooterDetails().subscribe((res: any) => {
      // this.addrssLink = res.address_link;
      setTimeout(() => {
        this.addrssLink = res.address_link;
        this.map = true
      }, 5000);
    })
  }
  contactFormSend() {

    if (!this.contactForm.valid) {
      this.errorMessage = 'Please fill the form properly before submitting'
      setTimeout(() => {
        this.errorMessage = null
      }, 3000)
      null
    }
    if (!this.contactForm.valid && this.contactForm.get('phone_number').errors) {
      this.errorMessage = 'Please enter a valid phone number'
      setTimeout(() => {
        this.errorMessage = null
      }, 3000)
      null
    }
    if (!this.token) {
      this.errorMessage = 'Mark the captcha box'
      setTimeout(() => {
        this.errorMessage = null
      }, 3000)
      null
    }
    else {
      this.apiService.contactFormData('/api/addcontact/', this.contactForm.value).subscribe({
        next: (res: { status: string }) => {


          if (res.status == "Contact Us Create Successfully") {
            this.contactForm.reset(),
              this.successMessage = 'Your req has been successfully sent',
              this.toastr.success(this.successMessage)
            this.errorMessage = null
          }
        },
        error: (error) => {
          this.errorMessage = 'Please fill the form properly before submitting'
          setTimeout(() => {
            this.errorMessage = null
          }, 3000)
        }
      })
    }

  }

  goToBecomeADealerPage() {
    this.router.navigate(['become-a-dealer'])
  }

  backDropClicked(e: boolean) {
    this.LogInModalOpen = e;
  }

  sendDataToProductPage(id, name) {
    let url = `${id}/${name}`;
    console.log(url, 'url');
    // this.router.navigate(['product-page'], { queryParams: { 'item': (name||'').replace(/ /g,"+")}});
    // this.router.navigate(['product-page', product,i])
    let nameInRoute: String = name.split(' ').join('-');
    this.router.navigate(['product-page', nameInRoute], { state: { example: id } });
    this.orderReturnServ.productId(id)
  }

  resolved($event: string) {
    this.token = $event
  }


  productSoldCounter: number = 0;
  productSoldStop: any = setInterval(() => {
    if(this.aboutUsDetails?.product_sold){
      this.productSoldCounter++;
      if (this.productSoldCounter == this.aboutUsDetails?.product_sold) {
        clearInterval(this.productSoldStop);
      }
    }  
  }, 25);

  bestReviewCounter: number = 0;
  bestReviewStop: any = setInterval(() => {
    if(this.aboutUsDetails?.best_review){
    this.bestReviewCounter++;
    if (this.bestReviewCounter == this.aboutUsDetails?.best_review) {
      clearInterval(this.bestReviewStop);
    }
  }
  }, 90)


  // add to cart
  added: boolean = false;
  prodQuant: number = 1;
  addedToList: boolean;
  id

  addCart = false;



  addToCart(product) {
    this.id = product.id
    this.apiService.User.subscribe(permission => {
      if (localStorage.getItem('userToken')) {
        this.added = true
        if (product.min_order_qty == "None" || product.min_order_qty == 0) {
          this.productService.sendDataToCart(product, this.prodQuant)

        } else {
          this.productService.sendDataToCart(product, +product.min_order_qty)

        }
      }
      if (!localStorage.getItem('userToken')) {
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
  ngAfterViewInit(): void {

  }

  // testimonial
  customerSay() {
    this.apiService.sayCutomer().subscribe(res => {
      this.customer = res
      this.title = this.customer[0].title
      this.description = this.customer[0].description
    });
  }
  redirectProduct() {

    this.router.navigate(['/our-products']);
  }

  catArray = [];
  applytheFilter() {
    let filterData = {
      category: `[${1}]`,
    }
    this.apiService.productFilter('/api/products_filter/', filterData)
  }

  sendDataToProductList(id, name) {
    // let nameInRoute: String = name.split(' ').join('-');
    // this.router.navigate(['/our-products',id, nameInRoute], { state: { example: id } });
    // this.router.navigate(['/our-products', id, name])

    let nameInRoute: String = name.split(' ').join('-');
    this.router.navigate(['/our-products', id,nameInRoute], { state: { example: id } });

    console.log(id);
    console.log(name);
    this.orderReturnServ.ourProductId(id)
  }
}




