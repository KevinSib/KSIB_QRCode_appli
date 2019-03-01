import { HistoricPage } from './../pages/historic/historic';
import { ReadQrCodePage } from './../pages/read-qr-code/read-qr-code';
import { CreateQrCodePage } from './../pages/create-qr-code/create-qr-code';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
    @ViewChild(Nav) nav: Nav;

    rootPage: any = CreateQrCodePage;

    pages: Array<{title: string, component: any}>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();
        this.pages = [
        { title: 'Génération de QRCode', component: CreateQrCodePage },
        { title: 'Lecture de QRCode', component: ReadQrCodePage },
        { title: 'Historique', component: HistoricPage },
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        });
    }

    openPage(page) {
        this.nav.setRoot(page.component);
    }
}
