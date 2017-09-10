import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanAuthenticateGuard } from './can-authenticate.guard/can-authenticate.guard';

const routes: Routes = [
  {
    path: 'authcallback',
    canActivate: [CanAuthenticateGuard],
    loadChildren: 'app/games/games.module#GamesModule'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
