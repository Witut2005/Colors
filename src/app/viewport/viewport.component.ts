import { Component, OnInit, AfterViewInit } from '@angular/core';
import {transition, trigger, state, style, animate } from '@angular/animations';
import { YourColorsArray } from '../colors';
import { HttpService } from '../http.service';
import Cookies from 'js-cookie';
import { Router } from '@angular/router';
import {Tags} from '../tags';

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

  transition('visible => invisible', [animate('4s ease')]),
  transition('invisible => visible', [animate('2.5s ease')]),


])

const tagSelectBoxAnimation = trigger('tagSelectBoxAnimation', [
  state('off', 
  style({
    top: '-100%'
  })),

  state('on', 
  style({
    top: '40%'
  })),

  transition('on => off', [animate('0.5s ease')]),
  transition('off => on', [animate('0.5s ease')]),

])

type Quote = {
  quote: string
  author: string
}

@Component({
  selector: 'app-viewport',
  templateUrl: './viewport.component.html',
  styleUrls: ['./viewport.component.css'],
  animations: [colorChange, opacityChange, tagSelectBoxAnimation]
})
export class ViewportComponent implements OnInit{

  
  tagSelected = 'Work';
  state = 'start';
  quoteState = 'visible';

  quotes:Quote[] = [
    {quote: "Less talk, more action", author: "Unknown"},
    {quote: "Work hard, succeed", author: "Unknown"},
    {quote: "Never give up", author: "Unknown"},
    {quote: "Think positive", author: "Unknown"},
    {quote: "Be the change", author: "Gandhi"},
    {quote: "Live your dreams", author: "Unknown"},
    {quote: "Stay focused", author: "Unknown"},
    {quote: "Do it now", author: "Unknown"},
    {quote: "Believe in yourself", author: "Unknown"},
    {quote: "Keep it real", author: "Unknown"},
    {quote: "Keep moving forward", author: "Unknown"},
    {quote: "Stay hungry, stay foolish", author: "Steve Jobs"},
    {quote: "Make it happen", author: "Unknown"},
    {quote: "Dream big", author: "Unknown"},
    {quote: "Stay positive", author: "Unknown"},
    {quote: "Stay true to yourself", author: "Unknown"},
    {quote: "Dare to be great", author: "Unknown"},
    {quote: "Stay motivated", author: "Unknown"},
    {quote: "Make each day count", author: "Unknown"},
    {quote: "You are capable", author: "Unknown"},
    {quote: "Stay strong", author: "Unknown"},
    {quote: "Be unstoppable", author: "Unknown"},
    {quote: "Take charge", author: "Unknown"},
    {quote: "Believe and achieve", author: "Unknown"},
    {quote: "Stay focused, achieve", author: "Unknown"},
    {quote: "Don't quit", author: "Unknown"},
    {quote: "Be a leader", author: "Unknown"},
    {quote: "Never settle", author: "Unknown"},
    {quote: "Stay the course", author: "Unknown"},
    {quote: "Be persistent", author: "Unknown"},
    {quote: "Stay motivated, succeed", author: "Unknown"},
    {quote: "Live with purpose", author: "Unknown"},
    {quote: "Be unstoppable", author: "Unknown"},
    {quote: "Work hard, play hard", author: "Unknown"},
    {quote: "Stay positive, win", author: "Unknown"},
    {quote: "Believe in your dreams", author: "Unknown"},
    {quote: "Stay hungry, stay foolish", author: "Unknown"},
    {quote: "Stay committed", author: "Unknown"},
    {quote: "Make it count", author: "Unknown"},
    {quote: "Stay the course, succeed", author: "Unknown"},
    {quote: "Never give up, win", author: "Unknown"},
    {quote: "Be fearless", author: "Unknown"},
    {quote: "Stay motivated, win", author: "Unknown"},
    {quote: "Don't settle, strive", author: "Unknown"},
    {quote: "Stay positive, succeed", author: "Unknown"},
    {quote: "Be the best", author: "Unknown"},
    {quote: "Stay committed, achieve", author: "Unknown"},
    {quote: "Stay the course, win", author: "Unknown"},
    {quote: "Believe, achieve", author: "Unknown"},
    {quote: "Stay motivated, achieve", author: "Unknown"},
  ]

  currentQuote = this.quotes[0]
  startDate: Date | null = null;
  currentDate: Date | null = null;
  timeLeft: number = 0; // time left to succed in task
  minutes: number = 10; // minutes given
  buttonText = 'start'; 
  currentQuoteIndex = 0;
  intervalId: null | any = null;
  animateGradient: boolean = true;
  selectedTag: string | null = null;
  tagBoxState: string = 'off';

  // tagBoxOverflox(tagBox: any):string
  // {
  //   if(tagBox.d)
  // }

  tagSelectBoxState():string
  {
    return this.tagBoxState
    // if(this.tagBoxState == 'on')
    //   return 'tag-select-on'
    // else
    //   return 'tag-select-off'
  }

  tagSelect()
  {
    this.tagBoxState = 'on'
  }


  tagChoosed(tagName: string)
  {
    this.tagSelected = tagName
    this.tagBoxState = 'off'
  }

  refresh()
  {
    window.location.reload()
  }

  constructor(public HttpService: HttpService, private router: Router) {
    if(Cookies.get('login') == 'false')
      this.router.navigateByUrl('/')
    for(let x in colors)
    {
      if(colors[x].length != 7)
      this.refresh()
    }
  }


  getTags()
  {
    return Tags
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

  start(tag: string)
  {
    
    this.buttonText = 'stop';
    this.state = 'mid';
    this.startDate = new Date();
    this.selectedTag = tag
    
    document.getElementById('controls')!.style.display = 'none';
    document.getElementById('controls-run')!.style.display = '';

    this.timeLeft = this.minutes * 60;

    this.intervalId = setInterval(()=>{
      
      if(this.timeLeft == 0)
      {
        clearInterval(this.intervalId)
        
        if(this.buttonText == 'start'){
          alert('Why did you stop?')
        }
        else
        {
          console.log(document.getElementById('color')?.style)
          alert('Hurray, you did it!')
          this.HttpService.postColor(String(colors), String(this.minutes), <Date>this.startDate, <string>this.selectedTag).subscribe((data)=>{console.log(data)})
        }
        this.refresh()
      }

      this.timeLeft--;
    }, 1000)

  }

  animationHandle(event: any)
  {
    if(!this.animateGradient)
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

    setInterval(()=>{
      
      this.currentQuoteIndex >= this.quotes.length && (this.currentQuoteIndex = 0)
      console.log(this.currentQuoteIndex)
      this.quoteState = 'invisible';

      setTimeout(()=>{

        this.quoteState = 'visible'; 
        this.currentQuote = this.quotes[this.currentQuoteIndex++];

      }, 5000)

    }, 10000);



  }


}
