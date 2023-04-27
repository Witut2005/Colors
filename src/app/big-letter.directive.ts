import { Directive, ElementRef, Renderer2, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[BigLetter]'
})
export class BigLetterDirective implements OnInit {

  

  constructor(private el: ElementRef, private renderer: Renderer2) { 
    this.el = el.nativeElement;
  }

  @HostListener('mouseenter')
  mouseenter()
  {
    this.renderer.setStyle(this.el, 'text-transform', 'uppercase');
  }

  @HostListener('mouseleave')
  mouseleave()
  {
    this.renderer.setStyle(this.el, 'text-transform', '');
  }
  

  ngOnInit(): void {
  }

}
