import * as _ from 'lodash';

const STORAGE = 'playerData';

export class WebStorageUtility {
    static get(storage: Storage, key: string): any {
        let data = this.getGettable(storage.getItem(STORAGE));
        let value = _.get(data, key);

        return value;
    }

    static set(storage: Storage, key: string, value: any): void {
        let data = this.getGettable(storage.getItem(STORAGE));
        _.set(data, key, value);
        storage.setItem(STORAGE, WebStorageUtility.getSettable(data));
    }

    static remove(storage: Storage, key: string): void {
        let data = this.getGettable(storage.getItem(STORAGE));
        _.unset(data, key);
        storage.setItem(STORAGE, WebStorageUtility.getSettable(data));
    }

    private static getSettable(value: any): string {
        return typeof value === "string" ? value : JSON.stringify(value);
    }

    private static getGettable(value: string): any {
        try {
            return JSON.parse(value);
        } catch(e) {
            return {};
        }
    }
}