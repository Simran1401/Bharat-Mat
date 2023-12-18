import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Products } from 'src/app/models/product.modal';
import { HttpService } from 'src/app/services/http.service';
import { productService } from 'src/app/services/product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Products[];
  apiUrl = 'https://api.bharatmatcompany.com'

  subscription: Subscription;


  constructor(private productService: productService, private apiServ: HttpService, private router: Router, private Arout: ActivatedRoute) {
    // console.log(this.router.getCurrentNavigation().extras.state?.['example']);

  }
  id
  ngOnInit() {
    this.id = this.Arout.snapshot.paramMap.get('id')

    // let pid = JSON.parse(localStorage.getItem('pId'));
    // console.log(pid);

    // if (pid) {
    //   this.id = pid
    // }

    if (!this.id) {


      if (localStorage.getItem('userToken')) {
        // this.subscription=    this.apiServ.authProduct().subscribe({
        //   next: (res: Products[]) => {
        //     this.products = res
        //     this.productService.productList.subscribe(() => {
        //     })
        //   }
        // })
        this.subscription = this.apiServ.authProduct().subscribe((res: Products[]) => {
          console.log(res);

          this.products = res

        }, err => {
          console.log(err.error.detail);
          if (err.error.detail == 'Invalid token.') {
            this.apiServ.getOurProducts().subscribe({
              next: (res: Products[]) => {
                this.products = res
              }
            })
          }
        })
      } else {
        this.subscription = this.apiServ.getOurProducts().subscribe({
          next: (res: Products[]) => {
            this.products = res
          }
        })
      }
    }
    if (this.id) {
      console.log('abc');
      
      this.apiServ.filteredProduct.subscribe(res => {
        if (res) {
          console.log(res);
          this.products = res;
          console.log(this.products);
          this.subscription.unsubscribe;
        }
      })
    } else {
      this.apiServ.filteredProduct.subscribe(res => {
        if (res) {

          this.subscription.unsubscribe;

          this.products = res;

        }
      })
    }

  }

  sendDataToProductPage(i) {
    this.router.navigate(['product-page', i])
  }
  getProduct() {
    if (localStorage.getItem('userToken')) {
      this.apiServ.authProduct().subscribe({
        next: (res: Products[]) => {
          this.products = res
          this.productService.productList.subscribe(() => {
          })
        }
      })
    } else {
      this.apiServ.getOurProducts().subscribe({
        next: (res: Products[]) => {
          this.products = res
        }
      })
    }
  }
}
