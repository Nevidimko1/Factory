'use strict';
import {
  Component,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'ticker',
  styleUrls: [
    './ticker.component.css'
  ],
  templateUrl: './ticker.component.html'
})
export class Ticker {

  @Output() public tickerChange:EventEmitter<number> = new EventEmitter<number>();

  private value: number = 0;

  private dec() {
    this.value--;
    this.tickerChange.emit(this.value);
  }
  private inc() {
    this.value++;
    this.tickerChange.emit(this.value);
  }
  private stop() {

  }

}
