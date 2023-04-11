import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  private static logged = false;

  loginStatus(): boolean 
  {
    return Cookies.get('login') == 'true';
  }

  signedIn():void
  {
    Cookies.set('login', 'true')
  }

  logout():void
  {
    Cookies.set('login', 'false')
    Cookies.set('username', '')
    Cookies.set('password', '')
    this.router.navigateByUrl('/')
  }

  constructor(private http: HttpClient, private router: Router) {}

  getColors(username: string): Observable<any>
  {
    if(Cookies.get('login') == 'false')
      this.router.navigateByUrl('/')
    
    return this.http.get('http://localhost:2020/users/colors/' + username)
  }

  postColor(color: string): Observable<any>
  {
    const body = {
      "username": Cookies.get('username'),
      "password": Cookies.get('password'),
      "colors": color
    }

    return this.http.post('http://localhost:2020/users/colors/', body)

  }

  addUser(username: string, password: string)
  {
    const body = {
      "username": username,
      "password": password
    }

    console.log(JSON.stringify(body))
    return this.http.post<any>('http://localhost:2020/users/', body);

  }

  getUserStats(userId: bigint)
  {

  }

  logUser(username: string, password: string): Observable<any> 
  {
    const body = {"password": password}
    return this.http.get('http://localhost:2020/users/' + username + '/?' + 'password=' + password)
  }

}
