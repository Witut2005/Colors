import { Component, OnInit } from '@angular/core';
import {currentUserInfo, setUserInfo, UserDataEntry  } from '../colors';
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

  getUserInfo()
  {
    return currentUserInfo?.reverse()
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

      const dataLength = response.data.colors.split('\n').slice(0, -1).length
      console.log('dataLength', dataLength)

      const newUserInfo: UserDataEntry[] = []
      for(let i = 0; i < dataLength; i++)
        newUserInfo.push({color: response.data.colors.split('\n').slice(0, -1)[i], duration: response.data.duration.split('\n').slice(0, -1)[i], date: response.data.date.split('\n').slice(0, -1)[i].slice(0, -6) + response.data.date.split('\n').slice(0, -1)[i].slice(-3), tag: response.data.tag.split('\n').slice(0,-1)[i]});

      setUserInfo(newUserInfo)


    });

   }

  ngOnInit(): void {
  }

}
