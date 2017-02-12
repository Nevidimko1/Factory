import { 
  Component,
  OnInit,
  Input 
} from '@angular/core';
import { Utils } from '../../../utils';
import { StorageService, DefinesService } from '../../../services';

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
    private storageService: StorageService,
    private definesService: DefinesService
  ) {

  }

  public ngOnInit() {
    this.storageMoney = this.storageService.listen('money', this.updateStorageMoney.bind(this));

    let list = this.storageService.listen('toBuy', this.updateList.bind(this));
    this.list = list;
    this.updateMoney(list);
  }

  private get enough() {
    return this.storageMoney >= Number(this.money) && Number(this.money) !== 0;
  }

  private get moreThanZero() {
    return Number(this.money);
  }

  private reject() {
    this.storageService.setItem('toBuy', []);
  }

  private updateMoney(list) {
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
    console.log(this.money);
  }

  //callbacks
  private updateStorageMoney = val => this.storageMoney = val;
  private updateList = val => {
    this.list = val;
    this.updateMoney(val);
  }
  
  public ngOnDestroy() {
    this.storageService.unlisten('money', this.updateStorageMoney);
    this.storageService.unlisten('toBuy', this.updateList);
  }
}