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

  private get moreThanZero() {
    return this.money;
  }

  private get value() {
    return Utils.toCurrency(this.money);
  }
}