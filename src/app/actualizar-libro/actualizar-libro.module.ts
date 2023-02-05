import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarLibroPageRoutingModule } from './actualizar-libro-routing.module';

import { ActualizarLibroPage } from './actualizar-libro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarLibroPageRoutingModule
  ],
  declarations: [ActualizarLibroPage]
})
export class ActualizarLibroPageModule {}
