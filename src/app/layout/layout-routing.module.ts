import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // {
      //   path: 'authcallback',
      //   canActivate: [CanAuthenticateGuard],
      //   loadChildren: 'app/games/games.module#GamesModule'
      // },
      // {
      //   path: 'games',
      //   loadChildren: 'app/games/games.module#GamesModule'
      // },
      {
        path: 'settings',
        loadChildren: 'app/settings/settings.module#SettingsModule'
      },
      // {
      //   path: '',
      //   redirectTo: '/games',
      //   pathMatch: 'full'
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
