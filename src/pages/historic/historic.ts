import { HistoricProvider } from './../../providers/historic/historic';
import { HistoricItem } from './../../models/historic-item.model';
import { BasePage } from './../base-page.page';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HistoricPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historic',
  templateUrl: 'historic.html',
})
export class HistoricPage extends BasePage {

    items: HistoricItem[] = []

    constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                public historicService: HistoricProvider) {
        super();
        this.pageTitle = "Historique";
    }

    ionViewDidEnter(): void {
        this.refreshData(true);
    }

    doRefresh(event: any): void {
        this.refreshData(true)
            .then(() => {
                event.target.complete();
            })
            .catch(() => {
                //this.modalService.showAlert('DEFAULT_SUBTITLE_ERROR_MESSAGE', 'ERROR_LOADING_FAVORITES');
                event.target.complete();
            });
    }

    private refreshData(force: boolean): Promise<any> {
        return new Promise((resolve, reject) => {
            this.historicService.getHistoric(force)
                .then((res) => {
                    this.items = res;
                    resolve();
                })
                .catch((err) => {
                    reject();
                });
        });
    }

}
