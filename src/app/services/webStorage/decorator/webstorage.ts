import {WebStorageUtility} from "../utility";
import * as _ from 'lodash';

export function LocalStorage(key?: string) {
    console.log(this);
    return WebStorage(localStorage, key);
}

export function SessionStorage(key?: string) {
    return WebStorage(sessionStorage, key);
}

// initialization cache
let cache = {};

export let WebStorage = (webStorage: Storage, key: string) => {
    return (target: Object, propertyName: string): void => {
        key = key || propertyName;

        let storedValue = WebStorageUtility.get(webStorage, key);

        Object.defineProperty(target, propertyName, {
            get: function() {
                return WebStorageUtility.get(webStorage, key);
            },
            set: function(value: any) {
                if (!cache[key]) {
                    // first setter handle
                    if (storedValue === null) {
                        // if no value in localStorage, set it to initializer
                        WebStorageUtility.set(webStorage, key, value);
                    }

                    cache[key] = true;
                    return;
                }

                WebStorageUtility.set(webStorage, key, value);
            }
        });
    }
}