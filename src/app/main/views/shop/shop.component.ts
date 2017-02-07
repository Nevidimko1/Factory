import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DefinesService } from '../../../services';

@Component({
  selector: 'shop',
  styles: [`
    .list {
      display: inline-block;
      overflow-y: auto;
      height: calc(100% - 40px);
      width: 100%;
    }
  `],
  template: `
    <div class="col-xs-12 h4">Магазин</div>
    <div class="list">
      <div class="res-list">
        <res-item *ngFor="let res of materialsList" [info]="res"></res-item>
      </div>
    </div>
  `
})
export class ShopComponent implements OnInit {
  constructor(
    public route: ActivatedRoute
  ) {}

  private materialsList = DefinesService.commonResources;
  public localState: any;

  public ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });
  }

}
