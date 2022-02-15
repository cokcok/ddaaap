import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Podda01Page } from './podda01.page';

const routes: Routes = [
  {
    path: '',
    component: Podda01Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Podda01PageRoutingModule {}
