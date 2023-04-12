import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import  Cookies from 'js-cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private HttpService: HttpService, private router: Router) { 
    console.log('login component')
    if(HttpService.loginStatus())
    {
      this.router.navigateByUrl('/Home')
    }
  }

  handleSubmit(userInput: HTMLInputElement, passwordInput: HTMLInputElement, login: boolean) 
  {
    
    if(login)
    {
      console.log('try to login')
      this.HttpService.logUser(userInput.value, passwordInput.value).subscribe((response)=>{
        if(response.status == 'failure')
        {
          console.log('login failed')
          alert('Bad username or password')
        }
        else
        {
          this.HttpService.signedIn();
          console.log('login success')
          alert('succefully logged')
          Cookies.set('login', String(this.HttpService.loginStatus()))
          Cookies.set('username', String(userInput.value))
          Cookies.set('password', String(passwordInput.value))
          this.router.navigateByUrl('/Home')
        }
      })
    }

    else
    {
      console.log('try to create new user')
      this.HttpService.addUser(userInput.value, passwordInput.value).subscribe((response) => {
        console.log(response)
        if(response.error)
        {
          alert(response.error)
        }
      })
    }
  }

  ngOnInit(): void {
  }

}
