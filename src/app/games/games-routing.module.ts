import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameCreateComponent } from './game-create.component/game-create.component';
import { GameListComponent } from './game-list.component/game-list.component';
import { SelectGameListComponent } from './select-game-list.component/select-game-list.component';

import { IsAuthenticatedGuard } from '../auth/is-authenticated.guard/is-authenticated.guard';

const routes: Routes = [
    {
        path: '',
        component: SelectGameListComponent
    },
    {
        path: 'create',
        component: GameCreateComponent
    },
    {
        path: 'mine',
        component: GameListComponent,
        canActivate: [
            IsAuthenticatedGuard
        ]
    },
    {
        path: 'all',
        component: GameListComponent
    },
    {
        path: 'state/:state',
        component: GameListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GamesRoutingModule { }
