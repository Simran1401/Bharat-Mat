import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-static-component',
  templateUrl: './static-component.component.html',
  styleUrls: ['./static-component.component.css']
})
export class StaticComponentComponent implements OnInit {

  constructor(private router:Router,private apiServ: HttpService) { }


  url: string;
  error: boolean;
  content: any;
  api_data: any;
  id: number;
  text: string;
  filtered_content: any;
  list: any;


  ngOnInit() {
    let page=this.router.url
    let id:number;
    if(page.includes("/privacy-policy")){ this.url="/api/privacy_policy/"}
    if(page.includes("/terms-of-services")){ this.url="/api/terms_and_service/"}
    if(page.includes("/diclaimer")){ this.url="/api/disclaimer/"}
    if(page.includes("/return-refund-and-cancellation-policy")){ this.url="/api/return_and_refund/"}
    this.apiServ.getDisclaimer(this.url).subscribe(value => {
      try {
        this.content = value;
        this.api_data = value["content"]
        const regex = new RegExp(/(?:(<h1>|<h2>|<h3>|<h4>|<h5>|<h6>))(\w|\d|\n|[().,\-:;@#$%^&*\[\]"'+–\/\/®°⁰!?{}|`~]| )+?(?=(<\/h1>|<\/h2>|<\/h3>|<\/h4>|<\/h5>|<\/h6>))/)
        let initial = this.api_data.split(/\r\n/)
        let list = []
        let final_content = []
        initial.map(value => {
          if (value.match(regex)) {
            this.text = ""
            const regex1 = new RegExp(/<h1>|<h2>|<h3>|<h4>|<h5>|<h6>| <\/h1>|<\/h2>|<\/h3>|<\/h4>|<\/h5>|<\/h6>/, 'g')
            let next = value.replace(regex1, '')
            let nextId = value.replace(/\W/g,'')
            list.push({value: next, id: nextId})
            this.id = next.replace(/\W/g,'')
           
            final_content.push({ "value": value, id: nextId })
          } else {
            this.text = this.text + value;
            final_content.push({ "value": value, id: "" })
          }
        })
        this.filtered_content = final_content
        this.list = list
      } catch {
        this.error = true;
      }
    })
  }


  scrollTo(element) {
    (document.getElementById(element.id) as HTMLElement).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    // let id = document.querySelector(element)
    
  }
}
