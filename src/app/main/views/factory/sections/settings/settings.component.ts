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
export class SettingsComponent{
  @Input() selectedTool: number;
  private toolsList: Array<any> = [];
  private materialsList: Array<Resource>;
  private craftableMaterialsList: Array<Resource>;
  private inventory;
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

  private changeMaterial(newValue: number) {
    //TODO: return used items to storage
    this.store.dispatch({type: Actions.TOOLS.CHANGE_MATERIAL, payload: {id: this.selectedTool, materialId: newValue}});
  }

  private get selectedToolObject() {
    return this.toolsList[this.selectedTool];
  }

  private enterEditNameMode() {
    this.newName = this.name;
    this.editNameMode = true;
  }

  private saveName() {
    this.store.dispatch({type: Actions.TOOLS.RENAME_ITEM, payload: {id: this.selectedTool, name: this.newName}});
    this.editNameMode = false;
  }

  private declineSaveName() {
    this.editNameMode = false;
  }

  private neededResourcesForCraft(i) {
    return this.materialToCraft && this.materialToCraft.recipe[i][1];
  }

  private itemsInStorage(id) {
    return this.inventory && this.inventory[id] || 0;
  }

  private get materialToCraft() {
    return this.materialsList && this.selectedToolObject && this.selectedToolObject.materialId ? this.materialsList[this.selectedToolObject.materialId] : null;
  }

  private get selectedMaterialRecipe() {
    let material = this.materialToCraft;

    if(!material)
      return [];

    let recipe = material && material.recipe,
      result = [];
    _.forEach(recipe, (r: Array<number>) => {
      result.push(this.materialsList[r[0]]);
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
  
  private get progress() {
    return this.selectedToolObject && this.selectedToolObject.progress >= 0 ? this.selectedToolObject.progress : 0;
  }

}
