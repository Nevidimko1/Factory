import {
  Component,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { StorageService, FactoryProgressService } from '../services';
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
    private router: Router,
    private store: Store<any>,
    private storageService: StorageService,
    private factoryProgress: FactoryProgressService
  ) {
    if(!this.storageService.initialized) {
      router.navigate(['menu']);
    } else {
      factoryProgress.start();
    }
  }

  public ngOnInit() {
    this.store.select('NameReducer')
      .subscribe((name: string) => this.username = name);
      
    this.store.select('MoneyReducer')
      .subscribe(value => this.money = Utils.toCurrency(value));
  }

}
