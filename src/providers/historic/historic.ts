import { HistoricItem } from './../../models/historic-item.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';

/*
  Generated class for the HistoricProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HistoricProvider {

    static readonly STORAGE_KEY_HISTORIC: string = 'historic_key';

    cachedHistoric: HistoricItem[] = [];

    constructor(public http: HttpClient,
                private nativeStorage:  NativeStorage) {
        
    }

    getHistoric(force: boolean = false): Promise<HistoricItem[]> {
        if (this.cachedHistoric.length <= 0 || force) {
            return this.loadHistoric();
        } else {
            return new Promise((resolve, reject) => {
                resolve(this.cachedHistoric);
            });
        }
    }

    loadHistoric(): Promise<HistoricItem[]> {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem(HistoricProvider.STORAGE_KEY_HISTORIC)
                .then((res) => {
                    if (res !== undefined && res != null) {
                        if (typeof res === 'string') {
                            this.mapDataToHistoricItem(res)
                                .then((historics) => {
                                    this.cachedHistoric = historics;
                                    resolve(historics);
                                })
                                .catch((error) => {
                                    this.cachedHistoric = [];
                                    resolve([]);
                                });
                        } else {
                            throw new Error('Not in code type');
                        }
                    } else {
                        this.cachedHistoric = [];
                        resolve([]);
                    }
                })
                .catch((err) => {
                    console.log('loadFavorites ERR', err);
                    if (err.code === 2) {
                        resolve([]);
                    } else {
                        this.cachedHistoric = [];
                        reject(err);
                    }
                });
        });
    }

    addToHistoric(item: HistoricItem): Promise<any> {
        if (item === null || item === undefined || item.value === null) {
            return Promise.reject('HistoricItem is null or value is not conform');
        }
        return new Promise((resolve, reject) => {
            this.cachedHistoric.push(item);
            this.saveHistoric()
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    private mapDataToHistoricItem(json: any): Promise<HistoricItem[]> {
        const mdata = JSON.parse(json);
        const items = mdata.filter((item) => {
            return item instanceof Object && item !== undefined;
        });
        const historicItems = items.map(element => {
            if (element instanceof Object && element !== undefined) {
                const historic: HistoricItem = new HistoricItem();
                if ('value' in element) {
                    historic.value = element.value;
                }
                if ('date' in element) {
                    historic.date = element.date;
                }
                return historic;
            }
        });
        return Promise.resolve(historicItems);
    }

    private saveHistoric(): Promise<any> {
        const favJSON: string = JSON.stringify(this.cachedHistoric);
        return this.nativeStorage.setItem(HistoricProvider.STORAGE_KEY_HISTORIC, favJSON);
    }

}
