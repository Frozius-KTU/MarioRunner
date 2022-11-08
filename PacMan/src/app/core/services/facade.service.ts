import { Injectable, Injector } from '@angular/core';
import { LobbyService } from './lobby.service';
import { LoginService } from './login.service';

@Injectable({ providedIn: 'root' })
export class FacadeService {
  private _lobbyService: LobbyService;
  public get lobbyService(): LobbyService {
    if (!this._lobbyService) {
      this._lobbyService = this.injector.get(LobbyService);
    }
    return this._lobbyService;
  }

  private _loginService: LoginService;
  public get loginService(): LoginService {
    if (!this._loginService) {
      this._loginService = this.injector.get(LoginService);
    }
    return this._loginService;
  }

  constructor(private injector: Injector) {}

  getLobbyList() {
    return this.lobbyService.getLobbyList();
  }
  getAddress() {
    return this.lobbyService.getLobbyDefaults();
  }

  isAuthenticated() {
    return this.loginService.isAuthenticated();
  }
}
