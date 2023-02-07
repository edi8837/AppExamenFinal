import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabInicialClientePage } from './tab-inicial-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: TabInicialClientePage,
    children: [
      {
        path: 'tabc1',
        loadChildren: () => import('../tab1c/tab1c.module').then(m => m.Tab1cPageModule)
      },
      {
        path: 'tab2c',
        loadChildren: () => import('../tab2c/tab2c.module').then( m => m.Tab2cPageModule)
      },
      
      {
        path: '',
        redirectTo: 'tabc1',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabInicialClientePageRoutingModule {}
