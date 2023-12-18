import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Products } from "../models/product.modal";


// razorpay
function _window():any{
  return window;
}

@Injectable({ providedIn: 'root' })


export class productService {


  //razorpay
  get nativeWindow():any{
    return _window();
  }

  constructor(private httpClient:HttpClient){

  }
  baseUrl='https://api.bharatmatcompany.com'
// sgenerateOrder
generateOrder(amount: any) {
  return this.httpClient.get(this.baseUrl + 'razorpay_order_id' + amount);
}
  public productList: BehaviorSubject<any> = new BehaviorSubject(null);
  public removeItemFromList: BehaviorSubject<any> = new BehaviorSubject(null);
  public increaseList: BehaviorSubject<any> = new BehaviorSubject(null);

  sendDataToCart(product, prodQuant) {
    let cartProd = {}
    if (JSON.parse(localStorage.getItem("cart"))) {
      cartProd = JSON.parse(localStorage.getItem("cart"));
      let data = {
        'id': product.id,
        'name': product.name,
        'image1': product.image1,
        'price': product.price,
        'discount': product.discount,
        'description': product.description,
        'quantity': prodQuant
      };
      cartProd[product.id] = data
    } else {
      let data = {
        'id': product.id,
        'name': product.name,
        'image1': product.image1,
        'price': product.price,
        'discount': product.discount,
        'description': product.description,
        'quantity': prodQuant
      }; cartProd[product.id] = data
    }
    localStorage.setItem("cart", JSON.stringify(cartProd));
    this.productList.next(null);
    this.removeItemFromList.next(null);
    this.increaseList.next(null);
  }





  removeItem(value) {
    let cartProd = JSON.parse(localStorage.getItem("cart"))
    delete cartProd[value.id];
 

    localStorage.setItem("cart", JSON.stringify(cartProd));
    this.productList.next(null);
    this.removeItemFromList.next(null);
    this.increaseList.next(null);
  }

  increase(value) {
    let cartProd = JSON.parse(localStorage.getItem("cart"));
   
    let data = value.quantity += 1
   
    
    cartProd[value.id]['quantity'] = data;
    

    localStorage.setItem("cart", JSON.stringify(cartProd));

    this.productList.next(null);
    this.removeItemFromList.next(null);
    this.increaseList.next(null);
  }

  decrease(value) {
    let cartProd = JSON.parse(localStorage.getItem("cart"));
    if (value.quantity <= 1) {
      this.removeItem(value)
    } else {
      let data = value.quantity -= 1;
      cartProd[value.id]['quantity'] = data;

      localStorage.setItem("cart", JSON.stringify(cartProd));
    }

    this.productList.next(null);
    this.removeItemFromList.next(null);
    this.increaseList.next(null);
  }

}

