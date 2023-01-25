import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarCitaPageRoutingModule } from './listar-cita-routing.module';

import { ListarCitaPage } from './listar-cita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarCitaPageRoutingModule
  ],
  declarations: [ListarCitaPage]
})
export class ListarCitaPageModule {}
