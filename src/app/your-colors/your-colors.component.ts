import { Component, OnInit } from '@angular/core';
import { YourColorsArray } from '../colors';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import Cookies from 'js-cookie';
import { Router } from '@angular/router';

interface UserJobs{
  colors: String[],
  duration: String[],
  date: String[],
  tag: String[]
}

@Component({
  selector: 'app-your-colors',
  templateUrl: './your-colors.component.html',
  styleUrls: ['./your-colors.component.css']
})
export class YourColorsComponent implements OnInit {

  userObservable: any;

  getColorsArray()
  {
    return YourColorsArray
  }
  
  getGradient(x: any)
  {
    return 'linear-gradient(45deg, ' + String(x) + ') 0% 0% / 400% 400%';
  }

  getQuote()
  {
    return 'quote'
  }

  constructor(private http: HttpService, private router: Router) {
    
    if(Cookies.get('login') == 'false')
      this.router.navigateByUrl('/')
      http.getColors(<string>Cookies.get('username')).subscribe((response: any)=>{

      let userJobs: UserJobs = {colors: response.data.colors.split('\n').slice(0, -1), duration: response.data.duration.split('\n').slice(0, -1), date: response.data.date.split('\n').slice(0, -1), tag: response.data.tag.split('\n')};

      console.log('color data', userJobs);
    

      for(let x in userJobs.colors)
        YourColorsArray.add(userJobs.colors[x]);
    
    });

   }

  ngOnInit(): void {
  }

}
