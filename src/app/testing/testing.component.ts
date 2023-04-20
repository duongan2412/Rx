import { Component, OnInit } from '@angular/core';
import moment = require('moment');
import { Observable } from 'rxjs';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss'],
})
export class Testing implements OnInit {
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
    // const amoount = this.calRoomAmount(
    //   1500,
    //   0,
    //   moment('2023-04-18', 'YYYY-MM-DD'),
    //   moment('2023-03-18', 'YYYY-MM-DD')
    // );
    // console.log('amoount', amoount);
    // console.log('moment', moment().startOf('day'));
    // console.log(this.roundToTwoDecimal(8.133));
    // this.checkRange();

    console.log(
      this.calculateQuantity(
        '2023-04-18',
        '2023-04-14',
        '2023-04-16',
        '2023-04-13',
        '2023-04-19'
      )
    ); // 0
    // console.log(this.calQtyByStatus(5, 8));
  }

  calculateQuantity(
    date: string,
    newStartDate: string,
    newEndDate: string,
    oldStartDate: string,
    oldEndDate: string
  ) {
    const momentDate = moment(date);
    const momentOldStartDate = moment(oldStartDate).startOf('day');
    const momentOldEndDate = moment(oldEndDate).startOf('day');
    const momentCheckinTime = moment(newStartDate).startOf('day');
    const momentCheckoutTime = moment(newEndDate).startOf('day');

    if (
      (moment(date).format('YYYY-MM-DD') ===
      moment(oldEndDate).format('YYYY-MM-DD') && moment(oldEndDate).format('YYYY-MM-DD') > moment(newEndDate).format('YYYY-MM-DD')) ||
      (moment(date).format('YYYY-MM-DD') ===
      moment(newEndDate).format('YYYY-MM-DD') && moment(oldEndDate).format('YYYY-MM-DD') < moment(newEndDate).format('YYYY-MM-DD'))
    ) {
      return 0;
    }

    if (
      momentDate.isBefore(momentCheckinTime) ||
      momentDate.isAfter(momentCheckoutTime.add(-1, 'day'))
    ) {
      return -1;
    }

    if (
      momentDate.isBetween(
        momentOldStartDate,
        momentOldEndDate.add(-1, 'days'),
        null,
        '[]'
      ) &&
      momentDate.isBetween(momentCheckinTime, momentCheckoutTime, null, '[]')
    ) {
      return 0;
    }

    return 1;
  }

  calQtyByStatus(oldStatus: number, newStatus: number) {
    const quantityMap: { [key: string]: number } = {
      '5,-1': -1,
      '5,2': 0,
      '5,6': -1,
      '5,7': 0,
      '5,8': -1,
      '-1,1': 9,
      '-2,2': 3,
    };
    const key = `${oldStatus},${newStatus}`;
    return quantityMap[key] || 0;
  }
}

interface Price {
  id: number;
  applyFromDate: string;
  applyToDate: string;
  code: string;
}

interface Booking {
  oldCheckIn: string;
  oldCheckOut: string;
  checkinTime: string;
  checkoutTime: string;
}
