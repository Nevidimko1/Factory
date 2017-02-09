import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/merge';

@Component({
  selector: 'ticker',
  styleUrls: [
    './ticker.component.css'
  ],
  templateUrl: './ticker.component.html'
})
export class Ticker implements OnInit{
  mouseDown$: Observable<MouseEvent>;
  mouseUp$: Observable<MouseEvent>;
  mouseOut$: Observable<MouseEvent>;

  @ViewChild('mouseDown') mouseDown: any;
  @ViewChild('mouseUp') mouseUp: any;
  @ViewChild('mouseOut') mouseOut: any;

  @Input() public minValue: number;
  @Input() public maxValue: number;
  @Output() public tickerChange:EventEmitter<number> = new EventEmitter<number>();

  private value: number = 0;
  private holdTimeout;
  private pressCycle: number = 1;

  ngOnInit() {}

  ngAfterViewInit() :void {
    const mouseDown = this.mouseDown.nativeElement;
    this.mouseDown$ = Observable.fromEvent(mouseDown, 'mousedown');
    this.mouseDown$
      .filter(e => e.fromElement.parentElement === mouseDown)
      .subscribe(function() {this.hold(true)}.bind(this));

    const mouseUp = this.mouseUp.nativeElement;
    this.mouseUp$ = Observable.fromEvent(mouseUp, 'mouseup');
    this.mouseUp$
      .filter(e => e.fromElement.parentElement === mouseUp)
      .subscribe(this.stop.bind(this));

    const mouseOut = this.mouseOut.nativeElement;
    this.mouseOut$ = Observable.fromEvent(mouseOut, 'mouseout');
    this.mouseOut$
      .filter(e => e.fromElement.parentElement === mouseOut)
      .subscribe(this.stop.bind(this));
  }

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
