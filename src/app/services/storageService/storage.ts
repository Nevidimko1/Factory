import * as _ from 'lodash';
import { DefinesService } from '../defines.service';

const PLAYER_DATA = 'playerData';
const EMPTY_STORAGE = {
  inventory: _.fill(Array(DefinesService.commonResources.length), 0)
}

export class Storage {
  private _storage: Object;

  constructor() {
    this._storage = {};
  }

  public get(key: string): any {
    if(!key)
      return this._storage;
    else
      return _.get(this._storage, key);
  }

  public set(key: string, value: any): void {
    _.set(this._storage, key, value);
    this.saveStorage();
  }

  public remove(key: string): void {
    _.unset(this._storage, key);
    this.saveStorage();
  }

  public clear(): void {
    this._storage = JSON.parse(JSON.stringify(EMPTY_STORAGE));
    this.saveStorage();
  }

  public loadStorage(): void {
    let data = this.getGettable(localStorage.getItem(PLAYER_DATA));
    this._storage = data;
  }

  //private
  private saveStorage(): void {
    localStorage.setItem(PLAYER_DATA, this.getSettable(this._storage));
  }

  private getSettable(value: any): string {
    return typeof value === "string" ? value : JSON.stringify(value);
  }

  private getGettable(value: string): any {
    try {
      return JSON.parse(value);
    } catch (e) {
      return {};
    }
  }
}