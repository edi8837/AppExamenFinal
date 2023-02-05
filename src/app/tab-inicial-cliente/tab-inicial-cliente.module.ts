import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabInicialClientePageRoutingModule } from './tab-inicial-cliente-routing.module';

import { TabInicialClientePage } from './tab-inicial-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabInicialClientePageRoutingModule
  ],
  declarations: [TabInicialClientePage]
})
export class TabInicialClientePageModule {}
