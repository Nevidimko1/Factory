import {
  Component,
  OnInit
} from '@angular/core';

import { StorageService, DefinesService } from '../../../services';

@Component({
  selector: 'shop',
  styleUrls: ['./shop.component.css'],
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit {
  private materialsList;  

  constructor(
    private definesService: DefinesService,
    private storageService: StorageService
  ) {

  }

  public ngOnInit() {
    if(this.storageService.initialized)
      this.materialsList = this.definesService.commonResources;
  }


}
