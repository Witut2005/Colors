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

  constructor(private http: HttpService, private router: Router) { 
    if(Cookies.get('login') == 'false')
      this.router.navigateByUrl('/')
  }

  ngOnInit(): void {
  }

}
