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
export class Ticker implements OnInit {
  @Input() public minValue: number;
  @Input() public maxValue;
  @Input() public value: number = 0;

  @Output() public change: EventEmitter<number> = new EventEmitter();
  
  private holdTimeout;
  private pressCycle: number = 1;

  constructor(){} 

  ngOnInit() {
    if(this.minValue >= 0)
      this.value = this.minValue;
  }

  private hold(inc) {
    if((!inc && this.value === this.minValue && this.minValue != undefined) || (inc && this.value === this.maxValue && this.maxValue != undefined))
      return this.stop();

    if(inc)
      this.value++;
    else
      this.value--;
    this.change.emit(this.value);

    this.holdTimeout = setTimeout(this.hold.bind(this), 200 / this.pressCycle, inc);
    if(this.pressCycle < 10)
        this.pressCycle++;
  }
  
  private stop() {
    if(this.holdTimeout) {
      clearTimeout(this.holdTimeout);
      this.pressCycle = 1;
    }
  }

  ngOnDestroy() {
    this.stop();
  }
}
