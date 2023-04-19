import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import Cookies from 'js-cookie';
import { Router} from '@angular/router';

interface User
{
  username: string;
  colors: string;
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  public days: string[] = [];

  daysInMonth (year: number, month: number): number
  {
      return new Date(year, month, 0).getDate();
  }

  monthChange(date: string): void
  {
    console.log(date)
    const howManyDays = this.daysInMonth(Number(date.slice(0, 4)), Number(date.slice(5)))
    
    this.days = []

    for(let i = 0; i < howManyDays; i++)
    {
      this.days.push('nicho')
    }
  }

  constructor(private http: HttpService, private router: Router) { 
    if(Cookies.get('login') == 'false')
      this.router.navigateByUrl('/')
  }

  ngOnInit(): void {

  }

}
