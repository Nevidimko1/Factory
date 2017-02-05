import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  private _store = {};
  private _initialized = false;
  private _saveGame = null;

  constructor() {
    let stringified = localStorage.getItem('playerData');
    try {
      let obj = JSON.parse(stringified);
      if(obj && typeof obj === 'object') {
        this._saveGame = obj;
      }
    }
    catch(e) {
      console.error('Cannot parse data from LocalStorage');
    }
  }

  public load() {
    if(this._saveGame) {
      this._store = this._saveGame;
      this._initialized = true;
    }
  }

  public createGame(username) {
    this.set('name', username);
    this._initialized = true;
  }

  public get saveGame() {
    return this._saveGame;
  }

  public get initialized() {
    return this._initialized;
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