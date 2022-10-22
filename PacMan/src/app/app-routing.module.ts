import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent}  from './home/home.component';
import { LobbiesComponent}  from './lobbies/lobbies.component';
import { GameBoardComponent } from './game-board/game-board.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'lobbies', component: LobbiesComponent},
  { path: 'game/:id', component: GameBoardComponent},
  { path: "**", redirectTo: "home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

