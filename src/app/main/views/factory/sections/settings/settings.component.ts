import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { Actions } from '../../../../../services';
import { Utils } from '../../../../../utils';

@Component({
  selector: 'factory-settings',
  styleUrls: ['./settings.component.css'],
  templateUrl: 'settings.component.html'
})

export class SettingsComponent implements OnInit{
  @Input() selectedTool: number;

  private toolsList: Array<ToolItem> = [];
  private materialsList: Array<Resource>;
  private craftableMaterialsList: Array<Resource>;
  private inventory: Array<number>;
  private editNameMode: boolean = false;
  private newName: string;

  constructor(
    private store: Store<any>
  ) { }

  public ngOnInit() {    
    this.store.select('ToolsReducer')
      .subscribe((list: Array<any>) => this.toolsList = list);
    
    this.store.select('ResourcesReducer')
      .subscribe((list: Array<Resource>) => {
        this.materialsList = list;

        this.craftableMaterialsList = _.filter(list, (item: Resource) => {
          return item.recipe && item.recipe.length && item.level !== 1;
        });
        Utils.sortByName(this.craftableMaterialsList, 'name');
      });

    this.store.select('InventoryReducer')
      .subscribe((list: Array<any>) => this.inventory = list);
  }

  public ngOnChanges(changes: any) {
    if(changes.selectedTool.currentValue !== changes.selectedTool.previousValue)
      this.editNameMode = false;
  }

  private changeMaterial(newValue) {
    let materialId = Number(newValue);
    
    //return used items to storage
    this.selectedToolObject.usedItems.forEach((item) => {
      this.store.dispatch({type: Actions.INVENTORY.ADD_ITEMS, payload: {id: item[0], number: item[1]}});
    });

    //change material
    this.store.dispatch({type: Actions.TOOLS.CHANGE_MATERIAL, payload: {id: this.selectedTool, materialId: materialId, usedItems: this.createRecipe(materialId)}});
  }

  private saveName() {
    this.store.dispatch({type: Actions.TOOLS.RENAME_ITEM, payload: {id: this.selectedTool, name: this.newName}});
    this.editNameMode = false;
  }

  private action(start: boolean) {
    this.store.dispatch({type: Actions.TOOLS.CHANGE_STATE, payload: {id: this.selectedTool, state: start}});
  }

  private get selectedToolObject() {
    return this.toolsList[this.selectedTool];
  }

  private enterEditNameMode() {
    this.newName = this.name;
    this.editNameMode = true;
  }

  private declineSaveName() {
    this.editNameMode = false;
  }

  private itemsInStorage(id) {
    return this.inventory && this.inventory[id] || 0;
  }

  private get materialToCraft() {
    return this.materialsList && this.selectedToolObject && this.selectedToolObject.materialId ? this.materialsList[this.selectedToolObject.materialId] : null;
  }

  private createRecipe(materialId) {
    let material = _.find(this.materialsList, {id: materialId});

    if(!material)
      return [];

    let recipe = material && material.recipe,
      result = [];
    _.forEach(recipe, (r: Array<number>) => {
      result.push([r[0], 0, r[1]]);
    });
    return result;
  }

  private get selectedMaterialIcon() {
    return this.materialToCraft ? this.materialToCraft.icon : 'machine';
  }

  private get name() {
    return this.selectedToolObject ? this.selectedToolObject.name : '';
  }

  private get level() {
    return this.selectedToolObject ? this.selectedToolObject.level : '';
  }

  private get speed() {
    return this.selectedToolObject ? this.selectedToolObject.speed : '';
  }

  private get started(): boolean {
    return this.selectedToolObject ? this.selectedToolObject.started : false;
  }
  
  private get progress() {
    return this.selectedToolObject && this.selectedToolObject.progress >= 0 ? this.selectedToolObject.progress : 0;
  }

  //recipe
  private get usedItems() {
    return this.selectedToolObject ? this.selectedToolObject.usedItems : [];
  }

  private materialName(id) {
    return _.get(this.materialsList, '['+id+'].name');
  }

  private currentRecipeItems(i) {
    return this.usedItems && this.usedItems[i] ? this.usedItems[i][1] : 0;
  }

  private neededRecipeItems(i) {
    return this.usedItems && this.usedItems[i] ? this.usedItems[i][2] : 0;
  }

}
