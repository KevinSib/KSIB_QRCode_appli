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

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        super();
        this.pageTitle = "Historique";
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HistoricPage');
    }

}
