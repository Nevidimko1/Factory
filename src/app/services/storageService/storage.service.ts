import * as _ from 'lodash';

import { Injectable, EventEmitter } from '@angular/core';
import { Storage } from './storage';
import * as events from 'events';

@Injectable()
export class StorageService {
  private _storage: Storage;
  private _initialized: boolean = false;
  private _ee;
  
  public saveGameExists: boolean = false;

  constructor() {
    this._storage = new Storage();
    this._storage.loadStorage();
    this._ee = new events.EventEmitter();
    this._ee.setMaxListeners(0);

    this.saveGameExists = !_.isEmpty(this._storage.get('name'));
  }

  public loadGame() {
    if(this.saveGameExists) {
      this._initialized = true;
      this._ee.emit();
    }
  }

  public createGame(username) {
    this._storage.clear();
    this._storage.set('name', username);
    this._initialized = true;
  }

  public get initialized() {
    return this._initialized;
  }

  public listen(key, cb) {
    this._ee.on(key, cb);
    return this._storage.get(key);
  }

  public unlisten(key, cb) {
    this._ee.removeListener(key, cb);
  }

  public getItem(key: string) {
    return this._storage.get(key);
  }

  public setItem(key: string, value: any) {
    this._storage.set(key, value);  
    this.emit(key, value);
  }

  //privates
  private emit(key: string, value: any, preventGlobal?: boolean) {
    //emit item change
    this._ee.emit(key, value);
    //emit object change
    if(key.indexOf('[') > -1 && !preventGlobal) {
      var oKey = key.split('[')[0];
      var val2 = this.getItem(oKey);
      this._ee.emit(oKey, val2);
    }
  }
}