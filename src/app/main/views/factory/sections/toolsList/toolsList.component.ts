import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { Actions } from '../../../../../services';

@Component({
  selector: 'factory-tools',
  styleUrls: ['./toolsList.component.css'],
  templateUrl: './toolsList.component.html'
})
export class ToolsListComponent implements OnInit {
  @Input() selectedTool: number;
  @Output() change: EventEmitter<number> = new EventEmitter();

  private machineCount: number = 0;
  private toolsList;

  constructor(
    private store: Store<any>
  ) { }

  public ngOnInit() {
    this.store.select('InventoryReducer')
      .subscribe(list => this.machineCount = list[265]);
    
    this.store.select('ToolsReducer')
      .subscribe(list => this.toolsList = list);
  }

  private selectTool($event) {
    let id;
    $event.path.forEach(o => {
      if(o.localName === 'factory-tool-item')
        id = o.id.replace('factory-tool-item-', '');
    });
    if(id >= 0) {
      this.change.emit(Number(id));
    }
  }
  
  private get canAddTool(): boolean {
    return this.machineCount >= 1;
  }

  private addTool():void {
    this.store.dispatch({type: Actions.INVENTORY.SUBSTRACT_ITEMS, payload: {id: 265, number: 1}});
    this.store.dispatch({type: Actions.TOOLS.ADD_ITEM});
  }
}
