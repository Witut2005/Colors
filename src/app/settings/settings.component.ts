import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private router: Router) { 
    if (Cookies.get('login') == 'false' || Cookies.get('login') == undefined)
      this.router.navigateByUrl('/')
  }

  ngOnInit(): void {
  }

}
