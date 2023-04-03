import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

  getColors(username: string)
  {
    return this.http.get('http://localhost:2020/users/' + username)
  }

  addUser(username: string, password: string)
  {

  }

  getUserStats(userId: bigint)
  {

  }

  logUser(username: string, password: string)
  {

  }

}
