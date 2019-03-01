import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateQrCodePage } from './create-qr-code';

@NgModule({
  declarations: [
    CreateQrCodePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateQrCodePage),
  ],
})
export class CreateQrCodePageModule {}
