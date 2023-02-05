import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearLibroPageRoutingModule } from './crear-libro-routing.module';

import { CrearLibroPage } from './crear-libro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearLibroPageRoutingModule
  ],
  declarations: [CrearLibroPage]
})
export class CrearLibroPageModule {}
