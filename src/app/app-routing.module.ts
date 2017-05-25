/////////////////////////////
// Modules.
/////////////////////////////
import { Routes, RouterModule } from '@angular/router';

/////////////////////////////
// Decorators.
/////////////////////////////
import { NgModule } from '@angular/core';

/////////////////////////////
// Guards.
/////////////////////////////
import { CanAuthenticateGuard } from './can-authenticate.guard';

const routes: Routes = [
    {
        path: 'authcallback',
        canActivate: [CanAuthenticateGuard],
        loadChildren: 'app/games/games.module#GamesModule'
    },
    {
        path: 'games',
        loadChildren: 'app/games/games.module#GamesModule'
    },
    // {
    //     path: 'settings',
    //     loadChildren: 'app/settings/settings.module#SettingsModule'
    // },
    {
        path: '',
        redirectTo: 'games',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [CanAuthenticateGuard]
})
export class AppRoutingModule { }
