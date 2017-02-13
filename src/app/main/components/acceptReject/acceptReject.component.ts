import { 
  Component,
  OnInit,
  Input 
} from '@angular/core';
import { Utils } from '../../../utils';
import { Store } from '@ngrx/store'
import { DefinesService } from '../../../services';
import { Actions } from '../../../services';

@Component({
  selector: 'accept-reject',
  styleUrls: ['./acceptReject.component.css'],
  templateUrl: 'acceptReject.component.html'
})

export class AcceptReject  implements OnInit{

  @Input() private behavior: string;
  @Input() private acceptName: string;
  @Input() private rejectName: string;

  private money: string;
  private storageMoney: number;
  private list;
  
  constructor(
    private definesService: DefinesService,
    private store: Store<any>
  ) {

  }

  public ngOnInit() {
    this.store.select('ToBuyReducer')
      .subscribe(list => this.updateMoney(list));

    this.store.select('MoneyReducer')
      .subscribe((value:number) => this.storageMoney = value);
  }

  private get enough() {
    return this.storageMoney >= Number(this.money) && Number(this.money) !== 0;
  }

  private get moreThanZero() {
    return Number(this.money);
  }

  private accept() {
    this.store.dispatch({type: Actions.MONEY.SUBSTRACT_MONEY, payload: this.money});
    this.list.forEach(function(n, i) {
      this.store.dispatch({type: Actions.INVENTORY.ADD_ITEMS, id: i, number: n});
    }.bind(this))
    this.store.dispatch({type: Actions.TO_BUY.CLEAR_TO_BUY});
  }

  private reject() {
    this.store.dispatch({type: Actions.TO_BUY.CLEAR_TO_BUY});
  }

  private updateMoney(list) {
    if(!list)
      return;
      
    this.list = list;
    let materials = this.definesService.materialsStatic;
    if(!materials.length)
      return;

    let money = 0;
    list.forEach((n, i) => {
      if(n) {
        money += materials[i].price * n;
      }
    })
    this.money = Utils.toCurrency(money);
  }
}