import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'factory-tool-item',
  styles: [`
    .wrapper {
      font-weight: bold;
      font-size: 13px;
      cursor: pointer;
      margin: 5px;
      border: 1px solid #6C6D70;
      background: #bababa;
    }

    .content {
      display: inline-flex;
      width: calc(100% - 8px);
      margin: 4px;
      border: 1px solid #6C6D70;
      background-color: #fff;
    }

    .pic {
      text-align: center;
      padding-top: 4px;
      height: 50px;
      width: 50px;
      border-right: 1px solid #6C6D70;
    }

    .icon {
      margin: 3px;
      background-color: #fff;
      display: inline-block;
    }

    .body {
      position: relative;
      word-wrap: break-word;
      width: calc(100% - 48px);
      margin: 0;
    }

    .name {
      height: 22px;
      padding-top: 2px;
    }

    .progress {
      margin: 0 5px;
      width: calc(100% - 10px);
    }

    .progress-bar {
      min-width: 2em;
    }
        
    .selected {
      background: #6C6D70;
    }
  `],
  template: `
    <div class="wrapper" [ngClass]="{'selected': selected}">
      <div class="content">
        <div class="pic">
          <div class="icon res res-machine"></div>
        </div>
        <div class="row body">
          <div class="col-xs-12 pd5 text-center name">{{name}}</div>
          <div class="col-xs-12 np progress">
            <div class="progress-bar" role="progressbar" [attr.aria-valuenow]="progress" aria-valuemin="0" aria-valuemax="100" [style.width]="progress + '%'">
              {{progress}}%
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ToolItemComponent{

  @Input() public selected: boolean = false;
  @Input() public name: string;
  @Input() public progress: number = 0;

  constructor() { }
}
