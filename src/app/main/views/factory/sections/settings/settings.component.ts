import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '../../../../../services';

@Component({
  selector: 'factory-settings',
  styleUrls: ['./settings.component.css'],
  templateUrl: 'settings.component.html'
})
export class SettingsComponent{
  @Input() selectedTool: number;
  private toolsList: Array<any> = [];
  private editNameMode: boolean = false;
  private newName: string;

  constructor(
    private store: Store<any>
  ) { }

  public ngOnInit() {    
    this.store.select('ToolsReducer')
      .subscribe((list: Array<any>) => this.toolsList = list);
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

  private get name() {
    return this.selectedToolObject ? this.selectedToolObject.name : '';
  }

  private get level() {
    return this.selectedToolObject ? this.selectedToolObject.level : '';
  }

  private get speed() {
    return this.selectedToolObject ? this.selectedToolObject.speed : '';
  }

}
