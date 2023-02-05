import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarLibroPage } from './actualizar-libro.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarLibroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarLibroPageRoutingModule {}
