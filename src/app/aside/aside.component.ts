import { Component, OnInit } from '@angular/core';
import {transition, trigger, state, style, animate } from '@angular/animations';
import { HttpService } from '../http.service';

const linkHover = trigger('linkHover', [

  state('normal', 
  style({
    color: 'white'
  })),

  state('hover', 
  style({
    color: '#FFC72C'
  })),

  transition('normal => hover', [animate('1s ease')]),
  transition('hover => normal', [animate('1s ease')]),

]);

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
  animations: [linkHover]
})
export class AsideComponent implements OnInit {

  linkState = 'normal'
  hoveredLink: String = '';

  sidebarOptions = ['Home', 'Stats', 'Your Colors', 'Settings', 'About']

  noHover()
  {
    this.hoveredLink = '';
  }

  hoverDetect(event: any)
  {
    console.log(event.target.innerHTML)
    this.hoveredLink = event?.target.innerHTML;
  }

  constructor(public HttpService: HttpService) { }

  ngOnInit(): void {
  }

}
