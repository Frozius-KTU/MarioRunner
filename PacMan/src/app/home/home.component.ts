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
import { ChatMessage } from '../models/chatMessage.model';
import { map, tap } from 'rxjs/operators';
import { ChatComponent } from '../presentational/chat/chat.component';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Client, Lobby } from '../models/game.types';
import { Subject } from '@microsoft/signalr';
import Swal from 'sweetalert2';
import { Invoker } from '../game-engine/commandTest';
import { PlatformLocation } from '@angular/common';
import { FacadeService } from '../core/services/facade.service';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  signalrConnectionEstablished$: Observable<boolean>;
  chatmessages: ChatMessage[] = [];

  playerName: string = '';
  commandTest: Invoker = new Invoker();
  constructor(
    private router: Router,
    private facadeService: FacadeService,
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
      this.facadeService
        .getClientById(sessionStorage.getItem('playerId')!)
        .subscribe({
          error: (error) => {
            this.resetClient();
          },
        });
    }

    this.signalrConnectionEstablished$ =
      this.facadeService.signalRService.connectionEstablished$;

    this.facadeService.signalRService.messageReceived$.subscribe((message) => {
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

      this.facadeService.createClient(client);
      client = this.facadeService.signalRService.createdClient;

      Swal.fire({
        title: 'Creating your client!',
        timer: 2000,
        timerProgressBar: true,
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(null);
          sessionStorage.setItem('playerName', this.playerName);
        },
        willClose: () => {
          client = this.facadeService.signalRService.createdClient;
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
      this.facadeService
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
