import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LobbiesComponent } from './lobbies/lobbies.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { OnlyAuthorizedGuard } from './core/guards/only-authorized.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'lobbies',
    component: LobbiesComponent,
    canActivate: [OnlyAuthorizedGuard],
  },
  {
    path: 'game/:id',
    component: GameBoardComponent,
    canActivate: [OnlyAuthorizedGuard],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
