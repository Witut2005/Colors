import { Component, OnInit } from '@angular/core';
import { YourColorsArray } from '../colors';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import Cookies from 'js-cookie';
import { Router } from '@angular/router';

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
      http.getColors(<string>Cookies.get('username')).subscribe((data: any)=>{
      console.log(data);
    
      const colors = data.colors.split('\n')

      console.log(colors)

      for(let x in colors)
        YourColorsArray.add(colors[x]);
    
    });

   }

  ngOnInit(): void {
  }

}
