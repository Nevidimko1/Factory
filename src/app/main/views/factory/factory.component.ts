import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'factory',
  styles: [`
    :host {
      display: block;
      padding: 5px;
      height: 100%;
      width: 100%;
      font-weight: bold;
    }
  `],
  template: `
    <factory-tools class="col-xs-4" [selectedTool]="selectedTool" (change)="toolSelectionChanged($event)"></factory-tools>
    <factory-settings class="col-xs-8" [selectedTool]="selectedTool"></factory-settings>
  `
})
export class FactoryComponent{
  public selectedTool: number = 0;

  private toolSelectionChanged(id) {
    this.selectedTool = id;
  }
}
