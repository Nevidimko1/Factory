import {
  Component,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { Actions } from '../../../services';
import { Utils } from '../../../utils';

@Component({
  selector: 'shop',
  styleUrls: ['./shop.component.css'],
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit {
  private money: number;
  private inventory;
  private materialsList;
  private toBuy: number = 0;
  private toPay: number = 0;
  private selectedItem: number = 0;

  constructor(
    private store: Store<any>
  ) {

  }

  public ngOnInit() {
    this.store.select('ResourcesReducer')
      .subscribe((list: Array<Resource>) => {
        this.materialsList = _.filter(list, o => o.level === 1);
      });
      
    this.store.select('InventoryReducer')
      .subscribe(list => this.inventory = list);
      
    this.store.select('MoneyReducer')
      .subscribe((value: number) => this.money = value);
  }

  private selectMaterial($event) {
    let id = -1;
    $event.path.forEach(o => {
      if(o.localName === 'res-item')
        id = o.id.replace('res-item-', '');
    });
    if(id >= 0) {
      this.selectedItem = Number(id);
      this.toBuy = 0;
      this.toPay = 0;
    }
  }

  public onAccept($event) {
    this.store.dispatch({type: Actions.MONEY.SUBSTRACT_MONEY, payload: Number(this.toPay)});
    this.store.dispatch({type: Actions.INVENTORY.ADD_ITEMS, payload: {id: this.selectedItem, number: this.toBuy}});
    this.toPay = 0;
    this.toBuy = 0;
  }

  public onDecline($event) {
    this.toPay = 0;
    this.toBuy = 0;
  }

  private toBuyChange(value) {
    let price = this.selectedMaterial ? this.selectedMaterial.price : 0;
    this.toPay = price * value;
    this.toBuy = value;
  }

  private get selectedMaterial() {
    return this.materialsList && this.materialsList[this.selectedItem];
  }

  private get selectedMaterialName() {
    return this.selectedMaterial && this.selectedMaterial.name;
  }

  private get selectedMaterialIcon() {
    return this.selectedMaterial && this.selectedMaterial.icon;
  }

  private get itemsInStorage() {
    return this.inventory[this.selectedItem] || 0;
  }

  private get canBuy() {
    return this.toPay > 0 && this.money >= this.toPay;
  }

  private get price() {
    return Utils.toCurrency(this.materialsList && this.materialsList[this.selectedItem] && this.materialsList[this.selectedItem].price || 0);
  }
}
