import { Component, OnInit, AfterViewInit } from '@angular/core';
import {transition, trigger, state, style, animate } from '@angular/animations';
import { YourColorsArray } from '../colors';
import { HttpService } from '../http.service';
import Cookies from 'js-cookie';
import { Router } from '@angular/router';

const randomColor = () =>  {return String('#' + Math.floor(Math.random()*16777215).toString(16))}

const colors = [randomColor(), randomColor(), randomColor(), randomColor()]

const colorChange = trigger('colorChange', [
  state('start', 
  style({
    background: '{{gradient}}',
    backgroundSize: '400% 400%',
    backgroundPosition: '0% 0%',
    opacity: 1
  }), {params: {gradient: 'linear-gradient(45deg, ' + colors[0] + ',' + colors[1] + ',' + colors[2] + ',' + colors[3] + ')' }}),

  state('mid', 
  style({
    background: '{{gradient}}',
    backgroundPosition: '100% 50%',
    backgroundSize: '400% 400%',
  }), {params: {gradient: 'linear-gradient(45deg, ' + colors[0] + ',' + colors[1] + ',' + colors[2] + ',' + colors[3] + ')' }}),

  state('end', 
  style({
    background: '{{gradient}}',
    backgroundPosition: '0% 50%',
    backgroundSize: '400% 400%',
  }), {params: {gradient: 'linear-gradient(45deg, ' + colors[0] + ',' + colors[1] + ',' + colors[2] + ',' + colors[3] + ')' }}),



  transition('void => start', [animate(1)]),
  transition('start => mid', [animate('10s ease')]),
  transition('mid => start', [animate('10s ease')]),
  transition('mid => end', [animate('10s ease')]),
  transition('end => mid', [animate('10s ease')]),
])


const opacityChange = trigger('opacityChange', [

  state('visible', 
  style({
    opacity: '1.0'
  })),

  state('invisible', 
  style({
    opacity: '0.0'
  })),

  transition('visible => invisible', [animate('2.5s ease')]),
  transition('invisible => visible', [animate('2.5s ease')]),


])


@Component({
  selector: 'app-viewport',
  templateUrl: './viewport.component.html',
  styleUrls: ['./viewport.component.css'],
  animations: [colorChange, opacityChange]
})
export class ViewportComponent implements OnInit{

  state = 'start';
  quoteState = 'visible';
  quotes = ['Be yourself; everyone else is already taken', "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe."]
  currentQuote = this.quotes[0]
  startDate: Date | null = null;
  currentDate: Date | null = null;
  timeLeft: number = 0;
  minutes: number = 0;
  buttonText = 'start';
  currentQuoteIndex = 0;
  intervalId: any | null = null;
  animate: boolean = true;

  constructor(public HttpService: HttpService, private router: Router) {
    if(Cookies.get('login') == 'false')
      this.router.navigateByUrl('/')
    for(let x in colors)
    {
      if(colors[x].length != 7)
        window.location.reload()
    }
  }

  colorRefresh()
  {
    window.location.reload()
  }

  toInt(value: number): String
  {
    if(parseInt(String(value), 10).toString().length < 2)
      return '0' + String(parseInt(String(value), 10));

    return String(parseInt(String(value), 10));
  }

  stop()
  {
    this.timeLeft = 0;
    this.buttonText = 'start';
  }

  start()
  {


    this.buttonText = 'stop';

    this.state = 'mid';
    this.startDate = new Date();
    console.log(this.startDate);
    
    document.getElementById('controls')!.style.display = 'none';
    document.getElementById('controls-run')!.style.display = '';

    this.timeLeft = this.minutes * 60;

    this.intervalId = setInterval(()=>{
      
      if(this.timeLeft == 0)
      {
        clearInterval(this.intervalId)
        
        if(this.buttonText == 'start')
          alert('Why did you stop?')
        else
        {
          console.log(document.getElementById('color')?.style)
          alert('Hurray, you did it!')
          this.HttpService.postColor(String(colors)).subscribe((data)=>{console.log(data)})
        }
        window.location.reload()
      }

      this.timeLeft--;
    }, 1000)

  }

  animationEnd(event: any)
  {
    console.log(event)
    // console.log('end')
    if(!this.animate)
      return;

    if(event.fromState == 'start' && event.toState == 'mid')
    {
      this.state = 'end';
    }

    else if(event.fromState == 'mid' && event.toState == 'start')
    {
      this.state = 'mid';
    }

    else if(event.fromState == 'end' && event.toState == 'mid')
    {
      this.state = 'start';
    }

    else if(event.fromState == 'mid' && event.toState == 'end')
    {
      this.state = 'mid';
    }

  }

  ngOnInit(): void {
    console.log(this.state)
    console.log(colors)
    setInterval(()=>{
      if(this.currentQuoteIndex == this.quotes.length)
        this.currentQuoteIndex = 0;

      this.quoteState = 'invisible';

      setTimeout(()=>{
        this.quoteState = 'visible'; 
        this.currentQuote = this.quotes[this.currentQuoteIndex++];}
      , 5000)

    }, 10000);

  }


}
