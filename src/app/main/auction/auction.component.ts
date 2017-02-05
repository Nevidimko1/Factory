import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'auction',
  template: `
    <div class="col-xs-12 h4">Аукцион</div>
  `
})
export class AuctionComponent implements OnInit {
  constructor(
    public route: ActivatedRoute
  ) {}

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
