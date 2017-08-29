import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { GamesComponent } from './games/games.component';
import { GameCreateComponent } from './game-create/game-create.component';
import { GameListComponent } from './game-list/game-list.component';

const routes: Routes = [
    {
        path: '',
        component: GamesComponent,
        children: [
            {
                path: '',
                component: GameListComponent
            },
            {
                path: 'state/:state',
                component: GameListComponent
            },
            {
                path: 'create',
                component: GameCreateComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GamesRoutingModule { }
