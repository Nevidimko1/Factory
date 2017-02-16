import {
  Component,
  OnInit,
  Input,
  Output,
  ElementRef, 
  NgZone, 
  ViewChild,
  EventEmitter
} from '@angular/core';
import { Store } from '@ngrx/store'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';

import { Actions } from '../../../services';

@Component({
  selector: 'ticker',
  styleUrls: [
    './ticker.component.css'
  ],
  templateUrl: './ticker.component.html'
})
export class Ticker implements OnInit {
  @Input() public itemId: number;
  @Input() public minValue: number;
  @Input() public maxValue: number;
  @Input() public behavior: string;

  @Output() public change: EventEmitter<number> = new EventEmitter();
  
  @ViewChild('myButton') myButton:ElementRef;

  private value: number = 0;
  private holdTimeout;
  private pressCycle: number = 1;
  private subs:Observable<MouseEvent>[] = [];

  private incAction: string;
  private decAction: string;

  constructor(
    private _zone:NgZone,
    private store: Store<any>
  ){

  } 

  ngOnInit() {
    if(this.minValue >= 0)
      this.value = this.minValue;

    if(this.behavior) {
      this.incAction = this.behavior === 'buy' ? Actions.TO_BUY.INCREMENT_TO_BUY : Actions.TO_SELL.INCREMENT_TO_SELL;
      this.decAction = this.behavior === 'buy' ? Actions.TO_BUY.DECREMENT_TO_BUY : Actions.TO_SELL.DECREMENT_TO_SELL;
      let listReducer = this.behavior === 'buy' ? 'ToBuyReducer' : 'ToSellReducer';

      this.store.select(listReducer)
        .subscribe(list => {
          this.value = list[this.itemId] || 0;
        });
    }

    this.manuallyBindToViewEvents();
  }

  private filterButton(e) {
    var t = e.target as HTMLElement;
    return t.nodeName === 'BUTTON';
  }

  manuallyBindToViewEvents() {  let mouseDown: Observable<MouseEvent>;
    let mouseUp: Observable<MouseEvent>;
    let mouseOut: Observable<MouseEvent>;

    this._zone.runOutsideAngular(() => {
      mouseDown = Observable.fromEvent(this.myButton.nativeElement, 'mousedown');
      mouseDown
        .filter(this.filterButton)
        .subscribe(e => {
          this.hold(e.target.name === 'inc');
        });

      mouseUp = Observable.fromEvent(this.myButton.nativeElement, 'mouseup');
      mouseUp
        .filter(this.filterButton)
        .subscribe(this.stop.bind(this));

      mouseOut = Observable.fromEvent(this.myButton.nativeElement, 'mouseout');
      mouseOut
        .filter(this.filterButton)
        .subscribe(this.stop.bind(this));

    });

    this.subs.push(mouseDown);
    this.subs.push(mouseUp);
    this.subs.push(mouseOut);
  }

  private hold(inc) {
    if((!inc && this.value === this.minValue && this.minValue != undefined) || (inc && this.value === this.maxValue && this.behavior === 'sell'))
      return this.stop();

    
      this._zone.run(() => {
        if(this.behavior) {
          if(inc)
            this.store.dispatch({type: this.incAction, payload: this.itemId});
          else
            this.store.dispatch({type: this.decAction, payload: this.itemId});
        } else {
          if(inc)
            this.value++;
          else
            this.value--;
          this.change.emit(this.value);
        }
      });

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
