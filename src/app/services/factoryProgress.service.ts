import * as _ from 'lodash';
import { Injectable, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { Actions } from './';

@Injectable()
export class FactoryProgressService {

  private materialsList: Array<Resource>;
  private toolsList: Array<ToolItem>;
  private inventory: Array<number>;

  constructor(
    private store: Store<any>
  ) { 
    this.store.select('ResourcesReducer')
      .subscribe((list: Array<Resource>) => this.materialsList = list);
      
    this.store.select('ToolsReducer')
      .subscribe((list: Array<ToolItem>) => this.toolsList = list);
      
    this.store.select('InventoryReducer')
      .subscribe((list: Array<number>) => this.inventory = list);
  }

  public start() {
    setInterval(() => { this.process() }, 100);
  } 

  private process() {
    if(!this.materialsList || !this.toolsList || !this.inventory)
      return;

    let d = new Date();
    let now = d.getTime();

    this.toolsList.forEach((tool: ToolItem) => {
      if(!tool.started || !tool.usedItems)
        return;

      if(!tool.nextTickAt || tool.nextTickAt <= now) {
        this.doTick(tool);
      }
    });
  }

  private doTick(tool: ToolItem) {
    let item, inStore;
    for(let i = 0; i < tool.usedItems.length; i++) {
      item = tool.usedItems[i];
      if(item[1] < item[2]) {
        if(this.inventory[item[0]] > 0) {
          this.store.dispatch({type: Actions.INVENTORY.SUBSTRACT_ITEMS, payload: {id: item[0], number: 1}});
          this.store.dispatch({type: Actions.TOOLS.INCREMENT_USED_ITEM, payload: {id: tool.id, i: i}});
        }
        break;
      } else if(i === tool.usedItems.length - 1) {
        //crafted
        this.store.dispatch({type: Actions.INVENTORY.ADD_ITEMS, payload: {id: tool.materialId, number: 1}});
        this.store.dispatch({type: Actions.TOOLS.RESET_USED_ITEMS, payload: {id: tool.id}});
      }
    }
  }
}