import {
  Component,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

@Component({
  selector: 'workbench',
  styleUrls: ['./workbench.component.css'],
  templateUrl: './workbench.component.html'
})
export class WorkbenchComponent implements OnInit{
  private groupsList;
  private materialsList;
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
    this.selectedItem = this.filteredMaterialsList[0].id;
  }

  private selectMaterial($event) {
    let id = -1;
    $event.path.forEach(o => {
      if(o.localName === 'wb-res-item')
        id = o.id.replace('wb-res-item-', '');
    });
    if(id >= 0)
      this.selectedItem = Number(id);
  }

  private get filteredMaterialsList() {
    return _.filter(this.materialsList, (item: Resource) => {
      return this.selectedGroup < 0 || (item.group === this.selectedGroup && item.group >= 0);
    });
  }

  public ngOnInit() {
    this.store.select('GroupsReducer')
      .subscribe(list => this.groupsList = list);

    this.store.select('ResourcesReducer')
      .subscribe((list: Array<Resource>) => {
        this.materialsList = _.filter(list, o => o.level !== 1);
        if(this.materialsList[0])
          this.selectedItem = this.materialsList[0].id;
      });
  }

}
