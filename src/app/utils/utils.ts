import { Injectable } from '@angular/core';

@Injectable()
export class Utils {

  public static toCurrency(value: any) {
    let n = (typeof value === 'number') ? value : Number(value);
    return n.toFixed(2);
  }

  public static sortByName(arr, field) {
    arr.sort(function(a, b){
      if(a[field] < b[field]) return -1;
      if(a[field] > b[field]) return 1;
      return 0;
    })
  }
}