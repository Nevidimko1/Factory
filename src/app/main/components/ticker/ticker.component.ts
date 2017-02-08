import {
  Component,
  OnInit,
  Input,
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
export class Ticker implements OnInit{

  @Input() public minValue: number;
  @Input() public maxValue: number;
  @Output() public tickerChange:EventEmitter<number> = new EventEmitter<number>();

  private value: number = 0;
  private holdTimeout;
  private pressCycle: number = 1;

  ngOnInit() {}

  private hold(inc) {
    if(!inc && (this.value === this.minValue && this.minValue != undefined) || inc && (this.value === this.maxValue && this.maxValue != undefined))
      return this.stop();

    if(inc)
      this.value++;
    else
      this.value--;

    this.tickerChange.emit(this.value);
    this.holdTimeout = setTimeout(this.hold.bind(this), 200 / this.pressCycle, inc);
    if(this.pressCycle < 10)
        this.pressCycle++;
  }
  
  private stop() {
    clearTimeout(this.holdTimeout);
    this.pressCycle = 1;
  }

  ngOnDestroy() {
    this.stop();
  }
}
