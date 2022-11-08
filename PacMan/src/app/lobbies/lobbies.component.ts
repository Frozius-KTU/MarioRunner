import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FacadeService } from '../core/services/facade.service';
import { LobbyService } from '../core/services/lobby.service';
import { SignalRService } from '../core/services/signalR.service';
import { Client, Lobby } from '../models/game.types';

@Component({
  selector: 'app-lobbies',
  templateUrl: './lobbies.component.html',
  styleUrls: ['./lobbies.component.scss'],
})
export class LobbiesComponent implements OnInit {
  lobbyList: Lobby[] = [];

  constructor(
    private readonly signalRService: SignalRService,
    private router: Router,
    private lobbyService: LobbyService,
    private facadeService: FacadeService,
    private location: PlatformLocation
  ) {
    location.onPopState(() => {
      this.router.navigate(['/home']).then(() => {});
    });
  }

  ngOnInit(): void {
    this.facadeService.getLobbyList().subscribe({
      next: (data) => {
        this.lobbyList = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  test() {
    console.log(sessionStorage.getItem('lobbyId'));
  }

  play(lobbyId: string) {
    if (this.getLobbyPlayerCount(lobbyId) == 2) {
      Swal.fire({
        icon: 'error',
        title: 'Sorry',
        text: 'Lobby is full',
        showCloseButton: true,
      });
      return;
    }

    let clientId = sessionStorage.getItem('playerId')!;

    this.signalRService.connectClientToLobby(clientId, lobbyId);

    Swal.fire({
      title: 'Joining lobby!',
      timer: 2000,
      timerProgressBar: true,
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        if (this.signalRService.clientStatusCode == '406') {
          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: 'Lobby is full',
            showCloseButton: true,
          });
        } else if (this.signalRService.clientStatusCode == '200') {
          sessionStorage.setItem('lobbyId', lobbyId);
        } else {
          Swal.fire({
            icon: 'error',
            title: this.signalRService.clientStatusCode,
            text: 'Something went wrong!',
            showCloseButton: true,
          });
        }
      },
    }).then((result) => {
      /* Read more about handling dismissals below */

      this.router.navigate(['/game', lobbyId]).then(() => {
        //window.location.reload();
        this.signalRService.setLobbyId(lobbyId);
      });
    });
  }

  getLobbyPlayerCount(id: string) {
    var lobby = this.lobbyList.find(function (element) {
      return element.id === id;
    });
    if (lobby?.player1 != null && lobby?.player2 != null) {
      return 2;
    } else if (lobby?.player1 != null || lobby?.player2 != null) {
      return 1;
    }
    return 0;
  }
}
