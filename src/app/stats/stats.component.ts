import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import Cookies from 'js-cookie';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserDataEntry } from '../colors';

interface User {
  username: string;
  colors: string;
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  public days: number[] = []
  public daysIds: number[] = []

  public selectedDate: string;
  selectedYear: string;
  selectedMonth: string;
  bestDayTime: number = 0;

  dayProgress = new Map<number, number>();

  daysInMonth(year: number, month: number): number {
    return new Date(year, month, 0).getDate();
  }

  theBestDayGet(): number {
    console.log(Math.max.apply(null, this.days))
    return Math.max.apply(null, this.days)
  }

  monthChange(date: string): void {
    console.log(this.selectedDate)

    this.selectedYear = this.selectedDate.slice(0, 4)
    this.selectedMonth = this.selectedDate.slice(5)

    this.selectedMonth[0] == '0' && (this.selectedMonth = this.selectedMonth[1])

    const howManyDays = this.daysInMonth(Number(date.slice(0, 4)), Number(date.slice(5)))

    this.days = []
    this.daysIds = []

    for (let i = 0; i <= howManyDays; i++) {
      this.days.push(0)
      this.daysIds.push(i + 1)
    }

    this.http.getColors(<string>Cookies.get('username')).subscribe((response: any) => {


      const dataLength = response.data.colors.split('\n').slice(0, -1).length
      console.log('dataLength', dataLength)

      const newUserInfo: UserDataEntry[] = []
      for (let i = 0; i < dataLength; i++)
        newUserInfo.push({ color: response.data.colors.split('\n').slice(0, -1)[i], duration: response.data.duration.split('\n').slice(0, -1)[i], date: response.data.date.split('\n').slice(0, -1)[i].slice(0, -6) + response.data.date.split('\n').slice(0, -1)[i].slice(-3), tag: response.data.tag.split('\n').slice(0, -1)[i] });

      console.log('searching', this.selectedMonth + '/' + 'x' + '/' + this.selectedYear)

      for (let i = 0; i < this.days.length; i++) {
        for (let j = 0; j < newUserInfo.length; j++) {

          const regExpression = new RegExp(this.selectedMonth + '/' + i + '/' + this.selectedYear, 'ig')

          if (regExpression.test(newUserInfo[j].date)) {
            this.days[i] += Number(newUserInfo[j].duration)
          }
        }
      }

      this.bestDayTime = this.theBestDayGet()

    })


  }

  getCurrentDate(): string {
    const year = String(new Date().getFullYear());
    const month = String(new Date().getMonth());
    return year + '-' + month.padStart(2, '0');
  }

  // dateToNgModel():string
  // {
  //   let tmp = this.selectedMonth.slice(0, -1);
  //   tmp = tmp.concat(tmp, String(Number(this.selectedMonth[-1] + 1)))
  //   return tmp;
  // }

  dayProgressBarHeightGet(dayId: number): string {
    if (!this.days[dayId])
      return '1%';
    return String((this.days[dayId] / this.bestDayTime) * 100) + '%';
  }

  dayPrograssBarPositionGet(dayId: number): string {

    if (this.days[dayId] == this.bestDayTime)
      return '0%'

    else if (!this.days[dayId])
      return '99%'

    let newTop = (this.days[dayId] / this.bestDayTime) * 100
    newTop = 100 - newTop;

    return String(newTop) + '%';

  }

  constructor(private http: HttpService, private router: Router) {
    if (Cookies.get('login') == 'false' || Cookies.get('login') == undefined)
      this.router.navigateByUrl('/')
    this.selectedDate = this.getCurrentDate()
    this.selectedYear = this.getCurrentDate().slice(0, 4)
    this.selectedMonth = this.getCurrentDate().slice(5)

    this.selectedMonth[0] == '0' && (this.selectedMonth = this.selectedMonth[1])

  }

  barHover(text: HTMLParagraphElement) {
    text.style.display = 'inline';
    text.style.color = 'black';
    text.style.backgroundColor = 'white';
    text.style.padding = '5px';
    text.style.borderRadius = '10px/10px';
  }

  barNoHover(text: HTMLParagraphElement) {
    text.style.display = '';
  }

  ngOnInit(): void {

  }

}
