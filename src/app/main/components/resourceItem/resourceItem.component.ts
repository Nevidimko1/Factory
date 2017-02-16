import {
  Component,
  OnInit,
  Input,
  Output
} from '@angular/core';
import { Store } from '@ngrx/store';

import { ResourceItemService } from './resourceItem.service';
import { Utils } from '../../../utils';

@Component({
  selector: 'res-item',
  styleUrls: [
    './resourceItem.component.css'
  ],
  templateUrl: './resourceItem.component.html',
  providers: [ResourceItemService]
})
export class ResourceItem implements OnInit {

  @Input() public info;
  @Input() public behavior;
  
  public itemsInStore: number;
  private minTickerValue: number = 0;

  constructor(
    private store: Store<any>,
    private resourceItemService: ResourceItemService
  ) {}

  public ngOnInit() {
    this.store.select('InventoryReducer')
      .subscribe(list => this.itemsInStore = list[this.info.id] || 0);
  } 
  
  private price(value) {
    return Utils.toCurrency(value);
  }

}
