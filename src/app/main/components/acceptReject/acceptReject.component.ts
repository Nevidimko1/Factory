import { 
  Component,
  OnInit,
  Input 
} from '@angular/core';
import { Utils } from '../../../utils';
import { Store } from '@ngrx/store'
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
  private materials: Array<Resource>;
  private list;
  
  constructor(
    private store: Store<any>
  ) {

  }

  public ngOnInit() {
    this.store.select('ToBuyReducer')
      .subscribe(list => {
        this.list = list;
        this.updateMoney();
      });

    this.store.select('MoneyReducer')
      .subscribe((value:number) => this.storageMoney = value);
      
    this.store.select('ResourcesReducer')
      .subscribe((materials: Array<Resource>) => this.materials = materials);
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

  private updateMoney() {
    if(!this.list || !this.materials) {
      this.money = Utils.toCurrency(0);
      return;
    }

    let money = 0;
    this.list.forEach((n, i) => {
      if(n) {
        money += this.materials[i].price * n;
      }
    })
    this.money = Utils.toCurrency(money);
  }
}