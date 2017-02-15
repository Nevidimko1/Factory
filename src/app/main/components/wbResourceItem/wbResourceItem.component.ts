import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'wb-res-item',
  styles: [`
    :host {
      position: relative;
      display: inline-block;
      width: 230px;
      border: 1px solid #6C6D70;
      margin: 5px 0 0 5px;
      font-weight: bold;
      font-size: 13px;
      line-height: 15px;
      cursor: pointer;
    }

    .head {
      display: flex;
    }

    .icon {
      margin: 3px;
      background-color: #fff;
      display: inline-block;
    }

    .name {
      display: inline-block;
      max-width: 190px;
      margin: 0 auto;
      padding: 3px;
    }
  `],
  template: `
    <div class="head">
      <div class="icon res res-{{info.icon}}"></div>
      <div class="name">{{info.name}}</div>
    </div>
  `
})
export class WbResourceItem {

  @Input() public info;

}
