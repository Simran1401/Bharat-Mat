import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { returnModal } from 'src/app/models/return.Modal';
import { returnAndOrder } from 'src/app/services/ordersAndReturn';

@Component({
  selector: 'app-order-returns',
  templateUrl: './order-returns.component.html',
  styleUrls: ['./order-returns.component.css']
})
export class OrderReturnsComponent implements OnInit {
  ClickedRow: any;
  HighlightRow: Number;
  orderForm!: FormGroup
  constructor(private returnService: returnAndOrder, private router: Router,private toastr:ToastrService) {

    this.ClickedRow = function (index) {
      this.HighlightRow = index

    }
  }

  product;
  apiUrl = 'https://api.bharatmatcompany.com';

  productQty;
  totalQty
  public collection = [];
  ngOnInit() {

    this.product = JSON.parse(localStorage.getItem('order'));
    let totalqty = 0;
    this.product.carts.forEach(function (arrayItem) {
       totalqty += arrayItem.qty;
     });
     this.totalQty=totalqty


    this.reasonForCancel();
    this.cancelReason()

    for (let i = 0; i <= this.product.carts[0].qty; i++) {
      this.collection.push(`${i}`);
    }

  
  }


  count(n) {
    return new Array(n)
  }
  quantity_list: any = {};
  return_product_list: any = [];
  extra_list: any = [];
  return_quantity: any = 0;
  return_subtotal: any;
  newQty

  update_return_detail(value, quantity) {
    // console.log(value);
    this.quantity_list[value?.id] = { "quantity": quantity }
    // console.log(this.quantity_list);

    let edit_list = this.return_product_list
    // console.log(this.return_product_list);

    this.return_product_list = edit_list.filter(val => val.order_product != value?.id)
    this.return_product_list.push({ "order_product": value?.id, "quantity": +quantity })
    let new_quantity = +quantity
    // console.log(new_quantity, 'new_quantity');
    this.newQty = new_quantity
    let new_list = this.extra_list?.filter(val => val?.id != value?.id)
    new_list.push({ "id": value?.id, "quantity": new_quantity, "price": (+quantity * value?.total_amout) })
    this.extra_list = new_list
    // console.log(new_list, 'newlistFliter');
    // console.log(this.extra_list, 'newlistFliter');
    this.return_quantity = 0; this.return_subtotal = 0;
    this.extra_list.map(val => {
      // console.log('map', val);
      this.return_quantity += val?.quantity;
      this.return_subtotal += val?.price;
      // console.log('return_quantity', this.return_quantity);
      // console.log('return_subtotal', this.return_subtotal);
    })
  }

  reason_list: any = {};
  select_reason(id, reason_id) {
    this.reason_list[id] = { "reason": reason_id }
    // console.log(id, 'id');
    // console.log(reason_id, 'reason_id');
  }

  reason;
  reasonForCancel() {
    this.returnService.reasonForCancel().subscribe(res => {
      this.reason = res;
    })
  }

  productItem = [];
  returnData: returnModal[] = [];
  returnStatus;
  cancelStatus;
  errormsg
  returnOrder() {
    let final_list = []

    // console.log(this.return_product_list);
    // console.log('reasonList', this.reason_list);

    this.return_product_list.map((prd) => {
      // console.log(prd, 'return_product_list');
      final_list.push({ "product": prd?.order_product, "qty": prd?.quantity, "reason": this.reason_list[prd?.order_product]?.reason })
    })
    // console.log(final_list);
    let data = {
      item: JSON.stringify(final_list),
      order_id: this.product.id,
    }

    if (this.product.order_status == 'Delivered') {
      this.returnService.returnOrder(data).subscribe(res => {
        this.returnStatus = res;
        if (this.returnStatus.status == "Order Successfuly Return") {
          this.toastr.success(this.returnStatus.status)
          this.router.navigate(['/dashboard/dashboard-orders-and-returns/orders'])
        } else {
          // console.log(this.returnStatus.Error);
          this.errormsg='Pease select a reason'
          setTimeout(()=>{
            this.errormsg=null
          },3000)
        }
      },
      error=>{
       
        this.errormsg='Pease select a reason'
        setTimeout(()=>{
          this.errormsg=null
        },3000)
      })
    } else {
      // this.router.navigate(['/dashboard/dashboard-orders-and-returns/orders'])
      let orderId = {
        order_id: this.product.id,
        reason:parseInt(this.reason_cancel_list?.reason) 
      }
    
      
      this.returnService.cancelOrder(orderId).subscribe(res => {

        this.cancelStatus = res
// console.log(this.cancelStatus.error,'error');

        if (this.cancelStatus.status == "This Order successfuly Cancelled") {
          this.router.navigate(['/dashboard/dashboard-orders-and-returns/orders']);
          this.toastr.success(this.cancelStatus.status)
        }
        else if(this.cancelStatus.error = "Reason matching query does not exist."){
          this.errormsg='Pease select a reason'
          setTimeout(()=>{
            this.errormsg=null
          },3000)
         
          
        }
        else {
       
          this.errormsg='Pease select a reason'
          setTimeout(()=>{
            this.errormsg=null
          },3000)
        }
      },error=>{
        
        this.errormsg='Pease select a reason'
        setTimeout(()=>{
          this.errormsg=null
        },3000)
      })
    }
  }
  // enable cancel order button after select table row or reason
  selectTr = false;
  selectReasn = false;
  selectCncl = false;
  selectqty
  selectTable() {
    this.selectTr = true;
  }
  selectReason() {
    this.selectReasn = true;
  }
  selectCancel() {
    this.selectCncl = true;
  }

  selectQty(){
    this.selectqty=true
  }
  // cancel REASON
  reason_cancel_list: any = {};
  select_cancel( reason_id) {
    this.reason_cancel_list = { "reason": reason_id }
   
  }
  cancel
  cancelReason() {
    this.returnService.cancelReason().subscribe(res => {
      this.cancel = res;
    })
  }

}

