import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  singnedOut():void
  {
    Cookies.set('login', 'false')
  }

  constructor(private http: HttpClient) {}

  getColors(username: string): Observable<any>
  {
    return this.http.get('http://localhost:2020/users/' + username)
  }

  addUser(username: string, password: string)
  {
    const body = {
      "name": username,
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
