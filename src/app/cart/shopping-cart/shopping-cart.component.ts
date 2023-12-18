import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { addressInfoModal } from 'src/app/models/addressInfoModal';
import { paymentAddData } from 'src/app/models/paymentModal';
import { HttpService } from 'src/app/services/http.service';
import { productService } from 'src/app/services/product-list.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  animations: [
    trigger('OrderSummary', [
      state('closed', style({
        height: '58px'
      })),
      state('opened', style({
        height: 'auto'
      })),
      transition('closed <=> opened', animate(150))
    ]),
    trigger('shippingDetails', [
      state('closed', style({
        height: '58px'
      })),
      state('opened', style({
        height: 'auto'
      })),
      transition('closed <=> opened', animate(150))
    ]),
    trigger('paymentCont', [
      state('closed', style({
        height: 'auto'
      })),
      state('opened', style({
        height: 'auto'
      })),
      transition('closed <=> opened', animate(150))
    ])
  ]
})
export class ShoppingCartComponent implements OnInit {

  state = 'closed'
  stateTwo = 'opened'
  stateThree = 'opened'
  @ViewChild('payMent') payMent;
  quantityOfProducts;
  paymentPage: boolean = false;
  Products;
  cashOnDelivery: boolean = false;
  apiUrl = 'https://api.bharatmatcompany.com';
  selectedCOD: boolean = true;
  totalCount: number;
  subTotal: number;
  totalAmount: number;
  discount: number;
  addressFormOfDelivery: FormGroup;
  finalSavedDataOfForm;
  errorAddressForm;
  addressInfo
  dataForm;
  cartThings = [];
  formVisible: boolean;
  editMode;
  idOfAddress;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productListService: productService,
    private apiServ: HttpService,
    private toastr: ToastrService
  ) { }

  userDetails
  getCoupon;


  isDealer = (localStorage.getItem('userType') == 'DEALER');

  ngOnInit() {
    // this.coupon()

    // this.getCoupon = JSON.parse(localStorage.getItem('coupon'));


    this.apiServ.coupo.subscribe(res => {

      this.getCoupon = res;
    })

    this.apiServ.getAddress('/api/myaddress/').subscribe((res: addressInfoModal[]) => {
      this.addressInfo = res;
      this.userDetails = res
      localStorage.setItem('address', JSON.stringify(this.addressInfo))
    })

    this.addressFormOfDelivery = new FormGroup({
      name: new FormControl(null, Validators.required),
      mobile_number: new FormControl(null, [Validators.required, Validators.maxLength(11), Validators.minLength(10)]),
      pincode: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required)
    })

    this.productListService.productList.subscribe(() => {
      try {
        this.Products = Object.values(JSON.parse(localStorage.getItem('cart')))
        this.quantityOfProducts = this.Products.length;
        if (this.quantityOfProducts <= 0) {
          window.location.reload()
        }
        //using for loop change the value of price in cart api
        for (let product of this.Products) {
          //increase the price value
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

      catch (error) {

      }
    }
    )

    this.getProfile()

    this.getState()
  }

  navigateToEdit(i, id) {
    this.formVisible = true;
    this.editMode = true

    this.addressFormOfDelivery = new FormGroup({
      name: new FormControl(i.name, Validators.required),
      mobile_number: new FormControl(i.mobile_number, [Validators.required, Validators.maxLength(11), Validators.minLength(10)]),
      pincode: new FormControl(i.pincode, Validators.required),
      address: new FormControl(i.address, Validators.required),
      country: new FormControl(i.country, Validators.required),
      state: new FormControl(i.state, Validators.required),
      city: new FormControl(i.city, Validators.required)
    })
    this.idOfAddress = i.id


  }
  navigateToNew() {
    this.formVisible = true;
  }

  dataFeilds;

  deleteAddress(i, id) {
    this.toastr.success('Address deleted successfully')
    if (this.dataForm == i.id || this.dataForm == 'undefined') {
      window.location.reload();
    }
    this.addressInfo.splice(id, 1)
    this.apiServ.deleteAddress('/api/checkout/', i.id).subscribe(res => {
      console.log(res);
      console.log(this.dataForm);
      console.log(i.id);
    })



  }

  username;
  userNumber;

  chooseAddress(addressInfo) {
    this.userNumber = addressInfo.mobile_number;
    this.username = addressInfo.name
    // var data = {
    //   name: `${addressInfo.name}`,
    //   mobile_number: `${addressInfo.mobile_number}`,
    //   pincode: `${addressInfo.pincode}`,
    //   address: `${addressInfo.address}`,
    //   country: `${addressInfo.country}`,
    //   state: `${addressInfo.state}`,
    //   city: `${addressInfo.city}`
    // }
    this.dataForm = addressInfo.id;
    this.paymentPage = true;
    this.stateTwo = 'closed';
    this.errorAddressForm = '';
    console.log(this.dataForm);

  }
  orderSummaryOpen() {
    this.state == 'closed' ? this.state = 'opened' : this.state = 'closed';
  }
  shippingAddressOpen() {
    this.stateTwo == 'closed' ? this.stateTwo = 'opened' : this.stateTwo = 'closed';
  }
  addrsRes
  goToPaymentMethod() {

    if (this.addressFormOfDelivery.controls['state'].value == 'Select State') {
      this.addressFormOfDelivery.controls['state'].invalid
    }

    if (!this.addressFormOfDelivery.valid || this.addressFormOfDelivery.controls['state'].value == 'Select State') {
      this.errorAddressForm = 'FILL THE ADRESS FORM CORRECTLY'
      setTimeout(() => {
        this.errorAddressForm = null
      }, 3000)
    }
    else {
      var data = {
        name: `${this.addressFormOfDelivery.value.name}`,
        mobile_number: `${this.addressFormOfDelivery.value.mobile_number}`,
        pincode: `${this.addressFormOfDelivery.value.pincode}`,
        address: `${this.addressFormOfDelivery.value.address}`,
        country: `${this.addressFormOfDelivery.value.country}`,
        state: `${this.addressFormOfDelivery.value.state}`,
        city: `${this.addressFormOfDelivery.value.city}`,
        id: `${this.idOfAddress}`
      }


      if (this.editMode) {
        this.apiServ.updateAddress('/api/checkout/', data).subscribe(res => {

          this.addrsRes = res
          if (this.addrsRes.status == "Checkouted Update Successfully") {
            this.toastr.success('Address Updated Successfully')
          }
          this.editMode = false;
          this.formVisible = false;
        })
      }
      else {
        let index = JSON.parse(localStorage.getItem('address')).findIndex(
          address => address.address == this.addressFormOfDelivery.controls['address'].value
        )
        if (index == -1) {
          this.apiServ.checkout('/api/checkout/', data).subscribe(res => {

            this.addrsRes = res
            if (this.addrsRes.status == "Successfully Checkouted") {
              this.toastr.success('Address Added Successfully');
              this.addressInfo.unshift(data)
            }
            this.apiServ.getAddress('/api/myaddress/').subscribe(res => {
              this.dataForm = res[0].id;
              console.log(res);

            })
          })
          this.paymentPage = true;
          this.stateTwo = 'closed';
          this.formVisible = false;
        } else {
          this.errorAddressForm = 'The Address You Have Entered Is Already In Your List Of Addresses'
          setTimeout(() => {
            this.errorAddressForm = null
          }, 4000)
        }

      }
    }
  }

  cancellationButton() {
    this.formVisible = false;
  }

  openCredit() {
    this.stateThree = 'opened'
    this.cashOnDelivery = false;
  }
  openCash() {
    // if (this.dealerProfileData.have_postpaid) {
    //   this.stateThree = 'closed'
    //   this.cashOnDelivery = false;
    // }
    // else {
    this.stateThree = 'closed'
    this.cashOnDelivery = true;
    // }
  }
  isCOD = false
  errorPostpaid;
  openPostpaid() {
    this.isPostpaid = true;
    this.selectedCOD = false;
    this.isCOD = false

    if (this.dealerProfileData.have_postpaid) {
      this.stateThree = 'closed'
      this.cashOnDelivery = false;
      this.isPostpaid = true;

      var clicking = <HTMLElement>document.querySelector('.otpModal');
      clicking?.click();
    } else {
      console.log('You have not a postpaid plan');
      this.errorPostpaid = 'You have not a postpaid plan';
      setTimeout(() => {
        this.errorPostpaid = null
      }, 3000)
    }
  }

  // payment section
  signature_id: any;
  order_id: any;
  payment: any;
  paymentId: any;

  error: any;
  rzp1: any;
  amount: any;
  key: any;

  data
  proceedToPay() {
    Object.values(JSON.parse(localStorage.getItem('cart'))).map(prod => {
      let cartstuff = { 'product': prod['id'], 'qty': prod['quantity'] }
      this.cartThings.push(cartstuff)
    })

    // var data = {
    //   cart: JSON.stringify(this.cartThings),
    //   payment_type: this.cashOnDelivery ? 'cod' : this.isPostpaid ? 'postpaid' : 'online',
    //   address_id: this.dataForm,
    //   coupon_code: ''
    // }


    if (this.cashOnDelivery) {
      var data = {
        cart: JSON.stringify(this.cartThings),
        payment_type: 'cod',
        address_id: this.dataForm,
        coupon_code: ''
      }
    } else if (this.isPostpaid) {
      var data = {
        cart: JSON.stringify(this.cartThings),
        payment_type: 'postpaid',
        address_id: this.dataForm,
        coupon_code: ''
      }
    } else {
      var data = {
        cart: JSON.stringify(this.cartThings),
        payment_type: 'online',
        address_id: this.dataForm,
        coupon_code: ''
      }
    }


    if (this.getCoupon) {
      data.coupon_code = this.getCoupon.id
    } else {
      data.coupon_code = ''
    }

    // if user is DEALER & HAVE Postpaid

    if (this.isPostpaid) {
      if (localStorage.getItem('userType') == 'DEALER') {
        if (this.dealerProfileData.have_postpaid) {
          if (this.totalAmount <= this.dealerProfileData.postpaid_limit.useable_amount) {
            this.apiServ.orderSuccessfully('/api/order/', data).subscribe((orderRespose: any) => {
              // console.log(orderRespose)
              if (data.payment_type == 'postpaid') {
                localStorage.removeItem('cart');
                localStorage.removeItem('coupon');
                this.router.navigate(['/order-placed-successfully']).then(() => {
                  window.location.reload();
                })
              }
            })
          } else {
            this.errorPostpaid = "You don't have sufficient balance in your postpaid account."
            // this.errorPostpaid = `Product total amount is ${this.totalAmount} less than or Equal to useable_amount ${this.dealerProfileData.postpaid_limit.useable_amount}`
            setTimeout(() => {
              this.errorPostpaid = null
            }, 3000)
          }
        }
      }
    }
    else {
      this.apiServ.orderSuccessfully('/api/order/', data).subscribe((orderRespose: any) => {
        // console.log(orderRespose)

        this.amount = orderRespose.amount;
        this.key = orderRespose.razorpay_merchant_key;

        if (data.payment_type == 'online') {
          // call razorpay api
          this.payWithRazor(orderRespose.razorpay_order_id);
        }
        if (data.payment_type == 'cod') {
          localStorage.removeItem('cart');
          localStorage.removeItem('coupon');
          this.router.navigate(['/order-placed-successfully']).then(() => {
            window.location.reload();
          })
          this.toastr.success(orderRespose.Success)


          // setTimeout(() => {
          //   window.location.reload()
          // }, 1000);
        }

      })
    }

  }








  codTrue() {
    this.selectedCOD = true;
    this.isPostpaid = false;
    this.isCOD = false
  }
  codFalse() {
    this.selectedCOD = false;
    this.isPostpaid = false;
    this.isCOD = true
  }
  isPostpaid = false
  postpaidtrue() {
    this.isPostpaid = true;
    this.selectedCOD = false;
    this.isCOD = false
  }
  payWithRazor(val) {
    const options: any = {
      key: this.key,
      amount: this.amount, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: 'Bharat Mats', // company name or product name
      description: 'Bharat Mats Transactions',  // product description
      image: '../../assets/images/header_images/logo.png', // company logo or product image
      order_id: val, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      'prefill': {
        'contact': this.userNumber,
        'email': '',
        'name': this.username,
      },
      theme: {
        color: '#0c238a'
      }
    };
    options.handler = ((response, error) => {
      options.response = response;
      // console.log(response, 'RESPONSE PAYMENT HANDLER');
      // call your backend api to verify payment signature & capture transaction
      this.paymentId = response.razorpay_payment_id;
      this.signature_id = response.razorpay_signature;
      this.order_id = response.razorpay_order_id;
      // console.log(`payment id ${this.paymentId.toString()} ${'\n'} orderid ${this.order_id.toString()} ${'\n'} signature ${this.signature_id.toString()}`);

      var paymentDetails = new paymentAddData();
      paymentDetails.razorpay_order_id = this.order_id;
      paymentDetails.razorpay_payment_id = this.paymentId;
      paymentDetails.razorpay_signature = this.signature_id;

      // this.apiServ.paymentSteps('/api/payment/', dat).subscribe(res => {
      this.apiServ.paymentSteps('/api/payment/', paymentDetails).subscribe(res => {
        // console.log('payment order details', res);
        this.payment = res;
        if (this.payment.message == "Payment Successful") {
          // console.log('payment succesfull');
          localStorage.removeItem('cart');
          localStorage.removeItem('coupon');
          // window.location.reload();
          //remove cart from localstorage when order success
          localStorage.removeItem('cart');
          localStorage.removeItem('rzp_checkout_user_id');
          localStorage.removeItem('rzp_checkout_anon_id')
          // window.location.reload();
          // this.router.navigate(['/order-placed-successfully'], { relativeTo: this.route }).then(() => {
          //   //remove cart from localstorage when order success
          //   localStorage.removeItem('cart');
          //   localStorage.removeItem('rzp_checkout_user_id');
          //   localStorage.removeItem('rzp_checkout_anon_id')
          //   // window.location.reload();

          // });
          this.router.navigate(['/order-placed-successfully']).then(() => {
            window.location.reload();
          })
        } else {
          // console.log('something went wrong');
        }
      })
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      // console.log('Transaction cancelled.');
    });
    const rzp = new this.productListService.nativeWindow.Razorpay(options);
    rzp.open();
  }



  // coupon() {
  //   this.apiServ.coupon().subscribe(res => {
  //     this.getCoupon = res;
  //     console.log(this.getCoupon[0].id);

  //   })
  // }



  dealerProfileData
  getProfile() {
    this.apiServ.myProfile().subscribe(res => {
      this.dealerProfileData = res;
      // console.log(this.dealerProfileData.postpaid_limit.postpaid_limit);
      // console.log(this.dealerProfileData.postpaid_limit.useable_amount);

    })
  }
  resDelete
  addressDelete(id) {
    this.apiServ.addressDelete(id).subscribe(res => {
      // console.log(res);
      this.resDelete = res
      if (this.resDelete.status == "Checkouted Delete Successfully") {
        this.toastr.success("Address Deleted Successfully")
      }
    })
  }



  stateDetails
  getState() {
    this.apiServ.getState().subscribe(res => {
      console.log(res);
      this.stateDetails = res
    })
  }

  cities
  getCity(state) {
    this.apiServ.getCity().subscribe(res => {
      console.log(res);
      this.cities = res;
      console.log(this.cities);
      console.log(state);

    })
  }

  selectState(val) {
    console.log(val);
    this.apiServ.getCity().subscribe(res => {
      console.log(res);
      this.cities = res;
      console.log(this.cities);


    })
  }
}


// adrs inut INDIA SELECTED HOGA
