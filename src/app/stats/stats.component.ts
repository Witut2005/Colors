import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

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

  constructor(private http: HttpService) { 
    console.log('get colors!!!!!')
    http.getColors('tomek').subscribe((data: any)=>{console.log(data)});
  }

  ngOnInit(): void {
  }

}
