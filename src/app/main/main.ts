import {
  Component,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
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
    private store: Store<any>,
    public storageService: StorageService
  ) {
    if(!this.storageService.initialized) {
      router.navigate(['menu']);
    }
  }

  public ngOnInit() {
    this.store.select('NameReducer')
      .subscribe((name: string) => this.username = name);
      
    this.store.select('MoneyReducer')
      .subscribe(value => this.money = Utils.toCurrency(value));
  }

}
