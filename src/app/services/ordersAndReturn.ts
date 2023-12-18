import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })

export class returnAndOrder {

    private apiURL = environment.apiURL;

    public return = new BehaviorSubject(null);
    public id = new BehaviorSubject(null);
    public ourid=new BehaviorSubject(null);
    
    constructor(private http: HttpClient) { }

    orderCancellation(product) {
        this.return.next(product)
        localStorage.setItem('order', JSON.stringify(product))
    }
    productId(id) {
        this.id.next(id)
        localStorage.setItem('pId', JSON.stringify(id))
    }
    ourProductId(id) {
        this.ourid.next(id)
        localStorage.setItem('productId', JSON.stringify(id))
    }
    reasonForCancel() {
        let url = this.apiURL + '/api/return_reason/'
        return this.http.get(url, {
            headers: new HttpHeaders({
                'Authorization': 'Token ' + localStorage.getItem('userToken')
            })
        })
    }

    returnOrder(data) {
        let url = this.apiURL + '/api/returnorder/'
        return this.http.post(url, data, {
            headers: new HttpHeaders({
                'Authorization': 'Token ' + localStorage.getItem('userToken')
            })
        })
    }

    returnProduct() {
        let url = this.apiURL + '/api/my_return_order/';
        return this.http.get(url, {
            headers: new HttpHeaders({
                'Authorization': 'Token ' + localStorage.getItem('userToken')
            })
        });
    }

    cancelOrder(data) {
        let url = this.apiURL + '/api/cancel_order/';
        return this.http.post(url, data, {
            headers: new HttpHeaders({
                'Authorization': 'Token ' + localStorage.getItem('userToken')
            })
        })
    }

    // /api/cancel_reason/
    cancelReason() {
        let url = this.apiURL + '/api/cancel_reason/';
        return this.http.get(url)
    }
}