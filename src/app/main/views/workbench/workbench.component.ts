import {
  Component,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'workbench',
  styleUrls: ['./workbench.component.css'],
  templateUrl: './workbench.component.html'
})
export class WorkbenchComponent implements OnInit{
  private groupsList;
  private selectedGroup: number;

  constructor(
    private store: Store<any>
  ) { }

  private selectGroup(groupId) {
    if(this.selectedGroup !== groupId)
      this.selectedGroup = groupId;
    else
      this.selectedGroup = null;
  }

  public ngOnInit() {
    this.store.select('GroupsReducer')
      .subscribe(list => this.groupsList = list);
  }

}
