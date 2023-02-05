import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabinicalPageRoutingModule } from './tabinical-routing.module';

import { TabinicalPage } from './tabinical.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabinicalPageRoutingModule
  ],
  declarations: [TabinicalPage]
})
export class TabinicalPageModule {}
