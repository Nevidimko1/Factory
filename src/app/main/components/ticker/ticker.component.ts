import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'ticker',
  styleUrls: [
    './ticker.component.css'
  ],
  templateUrl: './ticker.component.html'
})
export class Ticker {

  @Input() public tickerChange:Function;

  private value: number = 0;

  private dec() {
    this.value--;
    this.tickerChange(this.value);
  }
  private inc() {
    this.value++;
    console.log('INC');
    this.tickerChange(this.value);
  }
  private stop() {

  }

}
