import {
  Component,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { Actions } from '../../../services';
import { Utils } from '../../../utils';

@Component({
  selector: 'workbench',
  styleUrls: ['./workbench.component.css'],
  templateUrl: './workbench.component.html'
})
export class WorkbenchComponent implements OnInit{
  private groupsList;
  private materialsList;
  private inventory;
  private toCraft: number = 1;
  private selectedGroup: number = -1;
  private selectedItem: number = -1;

  constructor(
    private store: Store<any>
  ) { }

  private selectGroup(groupId) {
    if(this.selectedGroup !== groupId) {
      this.selectedGroup = groupId;
    } else {
      this.selectedGroup = -1;
    }
    this.toCraft = 1;
    this.selectedItem = this.filteredMaterialsList[0].id;
  }

  private selectMaterial($event) {
    let id = -1;
    $event.path.forEach(o => {
      if(o.localName === 'wb-res-item')
        id = o.id.replace('wb-res-item-', '');
    });
    if(id >= 0) {
      this.selectedItem = Number(id);
      this.toCraft = 1;
    }
  }

  private craft() {
    this.store.dispatch({type: Actions.INVENTORY.ADD_ITEMS, payload: {id: this.selectedItem, number: this.toCraft}});
    this.selectedMaterialRecipe.forEach((res, i) => {
      this.store.dispatch({type: Actions.INVENTORY.SUBSTRACT_ITEMS, payload: {id: res.id, number: this.neededResourcesForCraft(i)}});
    });
    this.toCraft = 1;
  }

  private toCraftChange(n) {
    this.toCraft = n;
  }

  private neededResourcesForCraft(i) {
    return this.selectedMaterial.recipe[i][1] * this.toCraft;
  }

  private itemsInStorage(id) {
    return this.inventory[id] || 0;
  }

  private price(id) {
    return Utils.toCurrency(this.materialsList && this.materialsList[id] && this.materialsList[id].price || 0);
  }

  private get filteredMaterialsList() {
    return _.filter(this.materialsList, (item: Resource) => {
      return this.selectedGroup < 0 && item.level !== 1 || (item.group === this.selectedGroup && item.group >= 0);
    });
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

  private get selectedMaterialRecipe() {
    let recipe = this.selectedMaterial && this.selectedMaterial.recipe,
      result = [];
    _.forEach(recipe, (r: Array<number>) => {
      result.push(this.materialsList[r[0]]);
    });
    return result;
  }

  private get canCraft() {
    let result = true;
    this.selectedMaterialRecipe.forEach((res, i) => {
      if(this.neededResourcesForCraft(i) > this.itemsInStorage(res.id))
        result = false;
    });
    return result;
  }

  public ngOnInit() {
    this.store.select('GroupsReducer')
      .subscribe(list => this.groupsList = list);

    this.store.select('ResourcesReducer')
      .subscribe((list: Array<Resource>) => {
        this.materialsList = list;
        if(this.filteredMaterialsList[0])
          this.selectedItem = this.filteredMaterialsList[0].id;
      });
      
    this.store.select('InventoryReducer')
      .subscribe(list => this.inventory = list);
  }

}
