/////////////////////////////
// Modules.
/////////////////////////////
// Angular modules.
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesComponent } from './games.component';
import { GameListComponent } from './game-list/game-list.component';

const routes: Routes = [
    {
        path: '',
        component: GamesComponent,
        children: [
            { path: '', component: GameListComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GamesRoutingModule { }