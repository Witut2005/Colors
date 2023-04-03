import { Component, OnInit } from '@angular/core';
import { YourColorsArray } from '../colors';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-your-colors',
  templateUrl: './your-colors.component.html',
  styleUrls: ['./your-colors.component.css']
})
export class YourColorsComponent implements OnInit {

  userObservable: any;

  // getUserColors()
  // {
  //   console.log('get colors')
  //   this.http.getColors('tomek').subscribe((data:any) =>(console.log(data)));
  // }

  getColorsArray()
  {
    return YourColorsArray
  }

  constructor(private http: HttpService) {

   }

  ngOnInit(): void {
  }

}
