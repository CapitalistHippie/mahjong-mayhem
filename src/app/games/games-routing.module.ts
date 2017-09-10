import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameCreateComponent } from './game-create.component/game-create.component';
import { GamesComponent } from './games.component/games.component';
import { GameListComponent } from './game-list.component/game-list.component';
import { SelectGameListComponent } from './select-game-list.component/select-game-list.component';

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
                path: 'select',
                component: SelectGameListComponent
            },
            // {
            //     path: 'mine',
            //     component: GameListComponent
            // },
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
