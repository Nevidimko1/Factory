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
  private materialsList: Array<Resource>;
  private inventory;
  private toCraft: number = 1;
  private selectedGroup: number = 0;
  private selectedItem: number = -1;

  constructor(
    private store: Store<any>
  ) { }

  public ngOnInit() {
    this.store.select('GroupsReducer')
      .subscribe((list: Array<Group>) => {
        this.groupsList = _.filter(list, o => o.id >= 0);
      });

    this.store.select('ResourcesReducer')
      .subscribe((list: Array<Resource>) => {
        this.materialsList = list;
        if(this.filteredMaterialsList[0])
          this.selectedItem = this.filteredMaterialsList[0].id;
      });
      
    this.store.select('InventoryReducer')
      .subscribe(list => this.inventory = list);
  }

  private selectGroup(groupId) {
    if(this.selectedGroup !== groupId) {
      this.selectedGroup = groupId;
    } else {
      this.selectedGroup = -1;
    }
    this.toCraft = 1;

    this.selectedItem = this.filteredMaterialsList.length ? this.filteredMaterialsList[0].id : -1;
  }

  private selectMaterial($event) {
    let id = -1;
    $event.path.forEach(o => {
      if(o.localName === 'res-item')
        id = o.id.replace('res-item-', '');
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

  private get price() {
    return Utils.toCurrency(this.selectedMaterial && this.selectedMaterial.price || 0);
  }
  
  private get filteredMaterialsList() {
    return _.filter(this.materialsList, (item: Resource) => {
      return item.recipe && item.recipe.length && ((this.selectedGroup < 0 && item.level !== 1) || (item.group === this.selectedGroup && item.group >= 0));
    });
  }

  private get selectedMaterial(): Resource {
    return _.find(this.materialsList, {id : this.selectedItem});
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
    if(!this.selectedMaterialRecipe || !this.selectedMaterialRecipe.length)
      return false;

    let result = true;
    this.selectedMaterialRecipe.forEach((res, i) => {
      if(this.neededResourcesForCraft(i) > this.itemsInStorage(res.id))
        result = false;
    });
    return result;
  }

}
