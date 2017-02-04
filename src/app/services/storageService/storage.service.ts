import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  private _store = {};

  public init() {
    try {
      this._store = JSON.parse(localStorage.getItem('playerData'));
    }
    catch(e) {
      console.error('Cannot parse data from LocalStorage');
    }
  }

  public get store() {
    return this._store = this._clone(this._store);
  }
  // never allow mutation
  public set store(value) {
    throw new Error('do not mutate the `.store` directly');
  }

  public get(prop?: any) {
    // use our store getter for the clone
    const store = this.store;
    return store.hasOwnProperty(prop) ? store[prop] : null;
  }

  public set(prop: string, value: any) {
    // internally mutate our store
    this._store[prop] = value;
    localStorage.setItem('playerData', JSON.stringify(this._store));
    return value;
  }

  private _clone(object: Object) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }
}