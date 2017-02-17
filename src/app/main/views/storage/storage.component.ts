import {
  Component,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { Actions } from '../../../services';
import { Utils } from '../../../utils';

@Component({
  selector: 'storage',
  styleUrls: ['./storage.component.css'],
  templateUrl: './storage.component.html'
})
export class StorageComponent{
  private money: number;
  private groupsList: Array<Group>;
  private inventory: Array<number>;
  private materialsList: Array<Resource>;
  private toSell:number = 0;
  private toEarn: number = 0;
  private selectedItem: number = 0;
  private selectedGroup: number = -1;

  public itemsInStorage = 0;

  constructor(
    private store: Store<any>
  ) { }

  public ngOnInit() {
    this.store.select('GroupsReducer')
      .subscribe((list: Array<Group>) => this.groupsList = list);

    this.store.select('ResourcesReducer')
      .subscribe((list: Array<Resource>) => {
        this.materialsList = list;
        if(this.filteredMaterialsList[0])
          this.selectItem(this.filteredMaterialsList[0].id);
      });
      
    this.store.select('InventoryReducer')
      .subscribe((list: Array<number>) => {
        this.inventory = list;
        this.refreshItemsInStorage();
      });
      
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
      this.selectItem(Number(id));
      this.toSell = 0;
      this.toEarn = 0;
    }
  }

  private selectItem(id) {
    this.selectedItem = id;
    this.refreshItemsInStorage();
  }

  private selectGroup(groupId) {
    if(this.selectedGroup !== groupId) {
      this.selectedGroup = groupId;
    } else {
      this.selectedGroup = -2;
    }
    this.toSell = 0;
    this.selectItem(this.filteredMaterialsList[0].id);
  }

  private get filteredMaterialsList() {
    return _.filter(this.materialsList, (item: Resource) => {
      return this.selectedGroup < -1 || (item.group === this.selectedGroup && item.group >= -1);
    });
  }
  
  public onAccept($event) {
    this.store.dispatch({type: Actions.MONEY.ADD_MONEY, payload: this.toEarn});
    this.store.dispatch({type: Actions.INVENTORY.SUBSTRACT_ITEMS, payload: {id: this.selectedItem, number: this.toSell}});
    this.toEarn = 0;
    this.toSell = 0;
  }

  public onDecline($event) {
    this.toEarn = 0;
    this.toSell = 0;
  }

  private toSellChange(value) {
    let price = this.selectedMaterial ? this.selectedMaterial.price : 0;
    this.toEarn = price * value;
    this.toSell = value;
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

  private refreshItemsInStorage() {
    this.itemsInStorage = (this.inventory && this.inventory[this.selectedItem]) || 0;
  }

  private get canSell() {
    return this.toEarn > 0 && this.itemsInStorage >= this.toSell;
  }

  private get price() {
    return Utils.toCurrency(this.materialsList && this.materialsList[this.selectedItem] && this.materialsList[this.selectedItem].price || 0);
  }
}
