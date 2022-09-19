import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelsBackgroundComponent } from './channels-background.component';
import { ImageModule } from '../image/image.module';
import { TextModule } from '../text/text.module';

@NgModule({
  declarations: [
    ChannelsBackgroundComponent,
  ],
  imports: [
    CommonModule,
    ImageModule,
    TextModule,
  ],
  exports: [
    ChannelsBackgroundComponent,
  ],
})
export class ChannelsBackgroundModule { }
