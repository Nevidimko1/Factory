import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { Http } from '@angular/http';

import { Actions } from '../';
import { StorageUtils } from '../../utils';

const STORAGE = 'playerData';

export class Storage {
  private _storage: Object;

  constructor(
    private http: Http,
    private store: Store<any>
  ) {
    //load materials
    this.http.get('assets/materials.json')
      .subscribe(res => {
        StorageUtils.calculateUnsetPrices(res.json(), (materials) => {
          this.store.dispatch({type: Actions.RESOURCES.SET_RESOURCES, payload: materials});
        });
      });
  }

  public saveGameExists(): boolean {
    let data = this.getGettable(localStorage.getItem(STORAGE));
    return !!data.name;
  }

  public loadGame(): void {
    let data = this.getGettable(localStorage.getItem(STORAGE));

    this.store.dispatch({type: Actions.NAME.SET_NAME, payload: data.name});
    this.store.dispatch({type: Actions.MONEY.ADD_MONEY, payload: data.money});
    this.store.dispatch({type: Actions.INVENTORY.SET_ITEMS, payload: data.inventory});
    
    this.addListeners();
  }

  public newGame(username): void {
    let newData = {
      name: username,
      money: 100
    };

    localStorage.setItem(STORAGE, this.getSettable(newData));

    this.store.dispatch({type: Actions.NAME.SET_NAME, payload: newData.name});
    this.store.dispatch({type: Actions.MONEY.ADD_MONEY, payload: newData.money});
    
    this.addListeners();
  }

  //privates
  private addListeners() {
    this.store.select('NameReducer')
      .subscribe(name => this.set('name', name));
    this.store.select('MoneyReducer')
      .subscribe(money => this.set('money', money));
    this.store.select('InventoryReducer')
      .subscribe(inventory => this.set('inventory', inventory));
  }

  private set(key: string, value: any): void {
    let data = this.getGettable(localStorage.getItem(STORAGE));

    _.set(data, key, value);
    localStorage.setItem(STORAGE, this.getSettable(data));
  }

  private getSettable(value: any): string {
    return typeof value === "string" ? value : JSON.stringify(value);
  }

  private getGettable(value: string): any {
    try {
      return JSON.parse(value);
    } catch (e) {
      return {};
    }
  }
  
}