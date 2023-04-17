import { Component, OnInit } from '@angular/core';
import moment = require('moment');
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs-learning',
  templateUrl: './rxjs-learning.component.html',
  styleUrls: ['./rxjs-learning.component.scss'],
})
export class RxjsLearningComponent implements OnInit {
  agent!: Observable<string>;
  agentName!: string;
  constructor() {}

  ngOnInit(): void {
    // this.agent = new Observable(
    //   function(observer) {
    //     try{
    //       observer.next('Hello');
    //       setInterval(() => {
    //         observer.next('Hi');
    //       }, 4000)
    //       setInterval(() => {
    //         observer.next('Good morning');
    //       }, 8000)
    //     }
    //     catch(e) {
    //       observer.error(`Oops, something went wrong ${e}`);
    //     }
    //   }
    // )
    // this.agent.subscribe((data) => this.agentName = data);
    const amoount = this.calRoomAmount(
      1500,
      0,
      moment('2023-04-18', 'YYYY-MM-DD'),
      moment('2023-03-18', 'YYYY-MM-DD')
    );
    console.log('amoount', amoount);
    console.log('moment', moment().startOf('day'));
  }

  calRoomAmount(
    monthPrice: number,
    discount: number,
    periodDate: moment.Moment,
    termPaidDate: moment.Moment
  ) {
    periodDate = periodDate.startOf('days');
    termPaidDate = termPaidDate.startOf('days');
    console.log('calRoomAmount', {
      periodDate,
      termPaidDate,
      momentDays: moment().diff(periodDate, 'days'),
      month: Math.ceil(moment().startOf('day').diff(periodDate, 'months')),
    });
    if (moment().diff(periodDate, 'days') >= 0) {
      let months = Math.ceil(moment().diff(periodDate, 'months'));
      console.log('months', months);
      months = months > 1 ? months : 1;
      return (monthPrice - discount) * months;
    }
    return 0;
  }
}
