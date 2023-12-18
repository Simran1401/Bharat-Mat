import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../services/http.service';

@Component({
    selector: 'app-dealersComp',
    templateUrl: './dealers.component.html',
    styleUrls: ['./dealers.component.css']
})
export class dealersComp implements OnInit {
    states

    constructor(private apiUrl: HttpService) { }

    form: FormGroup;
    network;

    ngOnInit() {

        this.apiUrl.getNetwork().subscribe((res) => {

            this.network = res

        })

        this.getState();
        this.form = new FormGroup({
            'state': new FormControl(''),
            'city': new FormControl('')
        })

        console.log(this.form.value);

    }

    stateDetails
    getState() {
        this.apiUrl.getState().subscribe(res => {
            console.log(res);
            this.stateDetails = res
        })
    }
    cities
    getCity(state) {
        this.apiUrl.getCity().subscribe(res => {
            console.log(res);
            this.cities = res;
            console.log(this.cities);
            console.log(state);

        })
    }
    selectState(val) {
        console.log(val);
        this.apiUrl.getCity().subscribe(res => {
            console.log(res);
            this.cities = res;
            console.log(this.cities);
        })
    }

    state;
    city;
    display = true
    cite
    stat
    error=false
    filter() {
        this.state = this.form.value.state
        this.city = this.form.value.city
        console.log(this.city);
        this.display = false

        if (this.city && this.state) {
            this.stat = false
            this.cite = true
            console.log('city');

        }

        if (this.state && !this.city) {
            this.cite = false
            this.stat = true
            console.log('state');

        }
        
    }

}