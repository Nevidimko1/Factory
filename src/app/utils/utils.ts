import { Injectable } from '@angular/core';

@Injectable()
export class Utils {

  public static toCurrency(value: any) {
    let n = (typeof value === 'number') ? value : Number(value);
    return n.toFixed(2);
  }
}