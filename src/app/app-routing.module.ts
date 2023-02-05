import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IngresadoGuard } from './ingresado.guard';
import { NoIngresadoGuard } from './no-ingresado.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate:[IngresadoGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
 
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate:[NoIngresadoGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  
  
 
 
  {
    path: 'crear-libro',
    loadChildren: () => import('./crear-libro/crear-libro.module').then( m => m.CrearLibroPageModule)
  },
  {
    path: 'listar-libro',
    loadChildren: () => import('./listar-libro/listar-libro.module').then( m => m.ListarLibroPageModule)
  },
  {
    path: 'tab1',
    loadChildren: () => import('./tab1/tab1.module').then( m => m.Tab1PageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'actualizar-libro',
    loadChildren: () => import('./actualizar-libro/actualizar-libro.module').then( m => m.ActualizarLibroPageModule)
  },
  {
    path: 'tabinical',
    loadChildren: () => import('./tabinical/tabinical.module').then( m => m.TabinicalPageModule)
  },
 
  {
    path: 'tab-inicial-cliente',
    loadChildren: () => import('./tab-inicial-cliente/tab-inicial-cliente.module').then( m => m.TabInicialClientePageModule)
  },
  {
    path: 'tab1c',
    loadChildren: () => import('./tab1c/tab1c.module').then( m => m.Tab1cPageModule)
  },
  {
    path: 'tab2c',
    loadChildren: () => import('./tab2c/tab2c.module').then( m => m.Tab2cPageModule)
  },  {
    path: 'reservar',
    loadChildren: () => import('./reservar/reservar.module').then( m => m.ReservarPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
