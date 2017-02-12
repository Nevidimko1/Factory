import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services';
import { Utils } from '../utils';

@Component({
  selector: 'main-game',
  styleUrls: [
    './main.css'
  ],
  templateUrl: './main.html'
})
export class Main implements OnInit {

  private username: string;
  private money: string;

  constructor(
    public router: Router,
    public storageService: StorageService
  ) {
    if(!this.storageService.initialized) {
      router.navigate(['menu']);
    } else {
      this.username = this.storageService.listen('name', this.updateName.bind(this));
      this.money = Utils.toCurrency(this.storageService.listen('money', this.updateMoney.bind(this)));
    }
  }

  //callbacks
  private updateName = val => this.username = val;
  private updateMoney = val => Utils.toCurrency(this.money = val);

  public ngOnInit() {}

  public ngOnDestroy() {
    this.storageService.unlisten('name', this.updateName);
    this.storageService.unlisten('money', this.updateMoney);
  }

}
