import { HistoricPage } from './../pages/historic/historic';
import { ReadQrCodePage } from './../pages/read-qr-code/read-qr-code';
import { CreateQrCodePage } from './../pages/create-qr-code/create-qr-code';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { QrCodeProvider } from '../providers/qr-code/qr-code';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    CreateQrCodePage,
    ReadQrCodePage,
    HistoricPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CreateQrCodePage,
    ReadQrCodePage,
    HistoricPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    QrCodeProvider
  ]
})
export class AppModule {}
