import { NativeStorage } from '@ionic-native/native-storage';
import { FilePath } from '@ionic-native/file-path';
import { SocialSharing } from '@ionic-native/social-sharing';
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

import { QRCodeModule } from 'angularx-qrcode';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { File } from '@ionic-native/file';
import { HistoricProvider } from '../providers/historic/historic';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@NgModule({
  declarations: [
    MyApp,
    CreateQrCodePage,
    ReadQrCodePage,
    HistoricPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    QRCodeModule,
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
    QrCodeProvider,
    SocialSharing,
    AndroidPermissions,
    File,
    FilePath,
    HistoricProvider,
    NativeStorage,  
    BarcodeScanner
   ]
})
export class AppModule {}
