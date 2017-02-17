import { 
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Utils } from '../../../utils';

@Component({
  selector: 'accept-reject',
  styleUrls: ['./acceptReject.component.css'],
  templateUrl: 'acceptReject.component.html'
})

export class AcceptReject {

  @Input() private acceptName: string;
  @Input() private rejectName: string;
  @Input() private money: number = 0;
  @Input() private canAccept: boolean;
  @Output() private onAccept: EventEmitter<any> = new EventEmitter();
  @Output() private onDecline: EventEmitter<any> = new EventEmitter();
  
  constructor( ) { }

  /*private accept() {
    if(this.behavior === 'buy') {
      this.store.dispatch({type: Actions.MONEY.SUBSTRACT_MONEY, payload: Number(this.money)});
      this.list.forEach(function(n, i) {
        this.store.dispatch({type: Actions.INVENTORY.ADD_ITEMS, payload: {id: i, number: n}});
      }.bind(this))
      this.store.dispatch({type: Actions.TO_BUY.CLEAR_TO_BUY});
    } else {
      this.store.dispatch({type: Actions.MONEY.ADD_MONEY, payload: Number(this.money)});
      this.list.forEach(function(n, i) {
        this.store.dispatch({type: Actions.INVENTORY.SUBSTRACT_ITEMS, payload: {id: i, number: n}});
      }.bind(this))
      this.store.dispatch({type: Actions.TO_SELL.CLEAR_TO_SELL});
    }
  }*/


  private get moreThanZero() {
    return this.money;
  }

  private get value() {
    return Utils.toCurrency(this.money);
  }
}