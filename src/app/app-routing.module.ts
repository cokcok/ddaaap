import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  { 
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    //path: 'podda01',
    path: 'podda01/:id',
    loadChildren: () => import('./podda01/podda01.module').then( m => m.Podda01PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
