import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../services/http.service';
import { productService } from '../services/product-list.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private productListService: productService,
    private apiServ: HttpService,
    private toastr: ToastrService
  ) { }


  apiUrl = 'https://api.bharatmatcompany.com'
  numberOfproductInCart;

  subTotal: number;
  discount: number;
  theTotal: number;

  LogInModalOpen: boolean = false;

  productList: any;

  quant: number;



  idSerialOfcartProd;


  LoggedInCorrecttion;

  dealerisOn;


  ngOnInit() {
    const javaScriptForHeadAndFoot = this.renderer.createElement('script');
    javaScriptForHeadAndFoot.src = `../../assets/javaScripts/headerAndFooter.js`;
    this.renderer.appendChild(document.head, javaScriptForHeadAndFoot);

    this.apiServ.User.subscribe(user => {
      this.LoggedInCorrecttion = user
    })

    if (localStorage.getItem('userToken')) {
      this.LoggedInCorrecttion = true
    } else {
      this.LoggedInCorrecttion = false
    }

    if (localStorage.getItem('userType') == 'DEALER') {
      this.dealerisOn = true;
    } else {
      this.dealerisOn = false;
    }

    this.productListService.productList.subscribe(() => {
      try {
        if (JSON.parse(localStorage.getItem("cart"))) {
          this.productList = Object.values(JSON.parse(localStorage.getItem("cart")));

          for (let product of this.productList) {
            product.price = product.price * product.quantity
          }

          let subTotal = 0; let totalMrp = 0; let totalCount = 0; let discount = 0
          this.productList.map(value => {
            subTotal = subTotal + +value.price;
            discount = discount + (+value.discount * +value.price / 100);
            totalMrp = totalMrp + +value.price - (+value.discount * +value.price / 100);
            totalCount = totalCount + +value.quantity
          })
          this.subTotal = subTotal;
          this.discount = discount;
          this.theTotal = totalMrp;
          this.numberOfproductInCart = totalCount;
        }
      } catch { }
    })
  }


  removeIt(value) {
    this.productListService.removeItem(value);
    window.location.reload();
  }

  increase(value) {
    this.productListService.increase(value)
  }

  decrease(value) {

    this.apiServ.getProductPage(`/api/productdetail/?id=${value.id}`).subscribe((res: any) => {

      let cartInLocal = JSON.parse(localStorage.getItem('cart'));
      if (cartInLocal[value.id].quantity < res[0].min_order_qty) {
        this.productListService.removeItem(value)
      }
    })



    this.productListService.decrease(value)
  }




  NavToCartPage() {

    this.apiServ.User.subscribe(user => {
      if (user) {
        this.router.navigate(['cart-component']);
        var clicking = <HTMLElement>document.querySelector('#close-cart');
        clicking?.click();
      } else {
        this.LogInModalOpen = true;
      }
    })
  }

  openLogInModal() {
    this.LogInModalOpen = true;
  }

  backDropClicked(e: boolean) {
    this.LogInModalOpen = e;
  }

  openProfile() {
    if (localStorage.getItem('userType') == 'CUSTOMER') {
      this.router.navigate(['dashboard/dashboard-profile'])
    }
    if (localStorage.getItem('userType') == 'DEALER') {
      this.router.navigate(['dashboard/dashboard-dealer-profile'])
    }
  }

  ordersAndReturns() {
    this.router.navigate(['dashboard/dashboard-orders-and-returns'])
  }

  myAddress() {
    this.router.navigate(['dashboard/dashboard-my-address-book'])
  }

  wallet() {
    this.router.navigate(['dashboard/dashboard-wallet'])

  }

  logOut() {
    this.apiServ.loggingOut('/api/logout/', localStorage.getItem('userToken')).subscribe(res => {

    })
    this.LogInModalOpen = false

    localStorage.clear();
    this.toastr.success('Logout successfull')
    this.router.navigate(['/home'])
      .then(() => {
        window.location.reload();
      });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
    this.toastr.success('Logout successfull')
    window.location.reload();
  }
}

