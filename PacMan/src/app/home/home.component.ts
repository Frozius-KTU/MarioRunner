import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { SignalRService } from '../core/services/signalR.service';
import { ChatMessage } from '../models/chatMessage.model';
import { map, tap } from 'rxjs/operators';
import { ChatComponent } from '../presentational/chat/chat.component';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LobbyService } from '../core/services/lobby.service';
import { Client, Lobby } from '../models/game.types';
import { Subject } from '@microsoft/signalr';
import Swal from 'sweetalert2';
import { ClientService } from '../core/services/client.service';
import { Invoker } from '../game-engine/commandTest';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayedColumns = ['message'];

  signalrConnectionEstablished$: Observable<boolean>;
  chatmessages: ChatMessage[] = [];

  playerName: string = '';
  commandTest: Invoker = new Invoker();

  constructor(
    private readonly signalRService: SignalRService,
    private router: Router,
    private lobbyService: LobbyService,
    private clientService: ClientService,
    private location: PlatformLocation
  ) {
    location.onPopState(() => {
      this.router.navigate(['/home']).then(() => {});
    });
  }

  ngOnInit() {
    //this.commandTest.main();

    this.playerName =
      sessionStorage.getItem('playerName') ||
      'Player_' + Math.floor(Math.random() * (999 - 100) + 100).toString();
    sessionStorage.removeItem('lobbyId');

    if (sessionStorage.getItem('playerId')) {
      this.clientService
        .getClientById(sessionStorage.getItem('playerId')!)
        .subscribe({
          error: (error) => {
            this.resetClient();
          },
        });
    }

    this.signalrConnectionEstablished$ =
      this.signalRService.connectionEstablished$;

    this.signalRService.messageReceived$.subscribe((message) => {
      this.chatmessages.push(message);
    });
  }

  resetClient() {
    sessionStorage.removeItem('playerId');
    sessionStorage.removeItem('playerName');
  }

  createClient() {
    if (!this.playerName || this.playerName.replace(/\s/g, '').length <= 5) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid name',
        text: 'Please choose your name with at least 5 characters',
      });
      return;
    }

    if (
      !sessionStorage.getItem('playerId') ||
      !sessionStorage.getItem('playerName')
    ) {
      let client: Client = {
        name: this.playerName,
        created: new Date().toISOString(),
      };

      this.signalRService.createClient(client);
      client = this.signalRService.createdClient;

      Swal.fire({
        title: 'Creating your client!',
        timer: 2000,
        timerProgressBar: true,
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
          sessionStorage.setItem('playerName', this.playerName);
        },
        willClose: () => {
          client = this.signalRService.createdClient;
          sessionStorage.setItem('playerId', client.id!);
          //console.log(client.id);
        },
      }).then((result) => {
        this.router.navigate(['/lobbies']).then(() => {
          //window.location.reload();
        });
      });
    } else if (sessionStorage.getItem('playerName') != this.playerName) {
      let client: Client = {
        name: this.playerName,
      };
      this.clientService
        .updateClient(sessionStorage.getItem('playerId')!, client)
        .subscribe({
          next: (data) => {
            sessionStorage.setItem('playerName', this.playerName);
            this.router.navigate(['/lobbies']).then(() => {
              //window.location.reload();
            });
          },
          error: (error) => {
            console.log(error);
          },
        });
    } else {
      this.router.navigate(['/lobbies']).then(() => {
        //window.location.reload();
      });
    }
  }
}
