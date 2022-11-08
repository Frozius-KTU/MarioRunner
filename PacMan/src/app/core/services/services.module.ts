import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';
import { FacadeService } from './facade.service';
import { LobbyService } from './/lobby.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [LobbyService, LoginService, FacadeService],
})
export class ServicesModule {}
