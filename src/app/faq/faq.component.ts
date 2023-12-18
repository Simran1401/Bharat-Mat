import { style } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FAQComponent implements OnInit {

  opened: boolean = true;
  @ViewChild('description', {static: false}) description: ElementRef
  state = 'closed';
  faqs: { id: number, title: string, description: string }[] = []


  constructor(private renderer: Renderer2, private httpService: HttpService) { }


  ngOnInit() {
    this.httpService.getFaq('/api/faq/').subscribe({
      next: (res: { id: number, title: string, description: string }[]) => {
       
          this.faqs = res
      }
    })
  }

  toggeler(i) {
   
  }
}
