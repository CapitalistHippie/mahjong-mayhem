// Modules.
import { GamesComponent } from './games.component';
import { GameListComponent } from './game-list/game-list.component';
import { Routes, RouterModule } from '@angular/router';

// Decorators.
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: GameListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GamesRoutingModule { }
