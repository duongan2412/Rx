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
  priceArray: Price[];

  constructor() {
    this.priceArray = [
      {
        id: 1,
        applyFromDate: '2023-03-26',
        applyToDate: '2023-04-14',
        code: 'DP12023032318038012',
      },
      {
        id: 2,
        applyFromDate: '2023-03-28',
        applyToDate: '2023-04-14',
        code: 'DP12023032318038012',
      },
    ];
  }

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
    let bk: Booking = {
      oldCheckIn: '2023-04-08',
      oldCheckOut: '2023-04-13',
      checkinTime: '2023-04-08',
      checkoutTime: '2023-04-14',
    };
    console.log(
      this.calculateQuantity(
        '2023-04-08',
        '2023-04-08',
        '2023-04-12',
        '2023-04-08',
        '2023-04-14'
      )
    ); // 0
    console.log(
      this.calculateQuantity(
        '2023-04-09',
        '2023-04-08',
        '2023-04-12',
        '2023-04-08',
        '2023-04-14'
      )
    ); // 0
    console.log(
      this.calculateQuantity(
        '2023-04-10',
        '2023-04-08',
        '2023-04-12',
        '2023-04-08',
        '2023-04-14'
      )
    ); // 1
    console.log(
      this.calculateQuantity(
        '2023-04-09',
        '2023-04-08',
        '2023-04-13',
        '2023-04-08',
        '2023-04-10'
      )
    ); // 1

    // console.log(this.calculateQuantity('2023-04-08', '2023-04-08', '2023-04-12', '2023-04-08', '2023-04-10')); // 0
    // console.log(this.calculateQuantity('2023-04-09', '2023-04-08', '2023-04-12', '2023-04-08', '2023-04-10')); // 0
    // console.log(this.calculateQuantity('2023-04-10', '2023-04-08', '2023-04-12', '2023-04-08', '2023-04-10')); // 1
    // console.log(this.calculateQuantity('2023-04-11', '2023-04-08', '2023-04-12', '2023-04-08', '2023-04-10')); // 1
    console.log(this.calQtyByStatus(5,8));
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

  roundToTwoDecimal(number: number) {
    const thirdDecimalPlace = Math.floor((number * 100) % 10);
    console.log({ thirdDecimalPlace });
    if (thirdDecimalPlace >= 5) {
      return Math.ceil(number * 100) / 100;
    } else {
      return Math.floor(number * 100) / 100;
    }
  }

  getPriceInRange(priceArray: Price[], startDate: string, endDate: string) {
    let matchingPrices = [];

    // Iterate through each price in the array
    for (let i = 0; i < priceArray.length; i++) {
      const price = priceArray[i];

      // Check if the price's date range overlaps with the given date range
      if (startDate <= price.applyToDate && endDate >= price.applyFromDate) {
        // If it does, add the price to the matchingPrices array
        matchingPrices.push(price);
      }
    }

    // Sort the matchingPrices array in descending order based on id
    matchingPrices.sort((a, b) => b.id - a.id);

    // Return the first (highest id) price in the matchingPrices array, if any
    if (matchingPrices.length > 0) {
      return matchingPrices[0];
    }

    // If there are no matching prices, return null or whatever is appropriate
    return null;
  }

  checkRange() {
    let startDate = '2023-03-26';
    let endDate = '2023-03-29';
    const priceInRange = this.getPriceInRange(
      this.priceArray,
      startDate,
      endDate
    );
    console.log('priceInRange', priceInRange);
    if (priceInRange) {
      console.log(
        `Price with id ${priceInRange.id} applies between ${priceInRange.applyFromDate} and ${priceInRange.applyToDate}.`
      );
    } else {
      console.log('No matching price found.');
    }
  }

  calculateQuantity(
    date: string,
    newStartDate: string,
    newEndDate: string,
    oldStartDate: string,
    oldEndDate: string
  ) {
    console.log({ date, oldStartDate, oldEndDate, newStartDate, newEndDate });
    const momentDate = moment(date);
    const momentOldStartDate = moment(oldStartDate).startOf('day');
    const momentOldEndDate = moment(oldEndDate).startOf('day');
    const momentCheckinTime = moment(newStartDate).startOf('day');
    const momentCheckoutTime = moment(newEndDate).startOf('day');

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
