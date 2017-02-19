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
    <factory-tools class="col-xs-3"></factory-tools>
    <factory-settings class="col-xs-6"></factory-settings>
    <factory-energy class="col-xs-3"></factory-energy>
  `
})
export class FactoryComponent{

}
