import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { productService } from '../services/product-list.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {



  constructor(
    private router: Router,
    private activatedRout: ActivatedRoute,
    private productListService: productService,
    private apiServ: HttpService
  ) { }

  id: number;

  Products = [];
  subTotal: number;
  totalAmount: number;
  discount: number;
  totalCount: number;

  apiUrl = 'https://api.bharatmatcompany.com';
  Discount
  couponId

  coupDat
  ngOnInit() {
    this.coupon();
    if (localStorage.getItem('coupon')) {
      this.Discount = JSON.parse(localStorage.getItem('coupon'));
      this.couponDiscount = this.Discount.discount_percent
      this.couponId = this.Discount.id
    }


    this.productListService.productList.subscribe(() => {
      try {
        if (JSON.parse(localStorage.getItem("cart"))) {
          this.Products = Object.values(JSON.parse(localStorage.getItem("cart")));

          for (let product of this.Products) {
            product.price = product.price * product.quantity
          }

          let subTotal = 0; let totalMrp = 0; let totalCount = 0; let discount = 0;
          this.Products.map(value => {
            subTotal = subTotal + +value.price;
            discount = discount + (+value.discount * +value.price / 100)
            totalMrp = totalMrp + +value.price - (value.discount * value.price / 100);
            totalCount = totalCount + +value.quantity
          })
          this.totalCount = totalCount
          this.subTotal = subTotal;
          this.totalAmount = totalMrp;
          this.discount = discount
        }

        this.coupDat = JSON.parse(localStorage.getItem('coupon'));
        if (this.coupDat.min_apply_amount > this.totalAmount) {
          localStorage.removeItem('coupon');
        }
      } catch { }
    })

  }


  goToProductLIst() {
    this.router.navigate(['/our-products'])
  }

  decreaseValue(value) {
    this.apiServ.getProductPage(`/api/productdetail/?id=${value.id}`).subscribe((res: any) => {
      let cartInLocal = JSON.parse(localStorage.getItem('cart'));

      if (cartInLocal[value.id].quantity < res[0].min_order_qty) {
        this.productListService.removeItem(value)
      }
    })
    this.productListService.decrease(value);
  }

  increaseValue(value) {
    this.productListService.increase(value)
  }

  removeIt(value) {
    this.productListService.removeItem(value)
  }

  goToShoppingCart() {
    this.router.navigate(['/Shopping-cart'], { relativeTo: this.activatedRout })
  }

  getCoupon
  couponDiscount
  availCoupon

  coupon() {
    this.apiServ.coupon().subscribe(res => {
      this.getCoupon = res;
      this.availCoupon = this.getCoupon[0];
      // this.couponDiscount = this.getCoupon[0].discount_price
      console.log(this.getCoupon);

      // this.getCoupon.map((coupon)=>{
      //   this.couponDiscount=coupon.discount_price
      // })
    })
  }

  couponApply;

  applyCoupon(coupon, id) {
    console.log(coupon);
    localStorage.setItem('coupon', JSON.stringify(coupon))
    this.apiServ.orderCoupon(coupon);

    this.couponApply = true;
    this.ngOnInit()

  }
  removeCoupon() {
    localStorage.removeItem('coupon');
    window.location.reload();

  }
}
