import {
  Component, OnInit,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, forkJoin  } from 'rxjs';
import { SignalRService } from '../core/services/signalR.service';
import { ChatMessage } from '../models/chatMessage.model';
import { map, tap } from 'rxjs/operators';
import { ChatComponent } from '../presentational/chat/chat.component';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LobbyService } from '../core/services/lobby.service';
import { Client, Lobby } from '../models/game.types';
import { Subject } from '@microsoft/signalr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumns = ['message']

  cpuValue$: Observable<number>;
  signalrConnectionEstablished$: Observable<boolean>;
  chatmessages: ChatMessage[] = [];

  public form: FormGroup;
  playerName: string = "";

  lobbyDisplayedColumns = ['name', 'level', 'players', 'join']
  lobbyList: Lobby[] = [];



  constructor(
    private readonly signalRService: SignalRService,
    formbuilder: FormBuilder,
    private router: Router,
    private lobbyService: LobbyService
  ) {
    this.form = formbuilder.group({
      chatmessage: ['', Validators.required],
      usermessage: ['', Validators.required]
    });
  }


  ngOnInit() {

    this.playerName = sessionStorage.getItem('playerName') || 'Player_' + (Math.floor(Math.random() * (999 - 100) + 100)).toString();
    sessionStorage.removeItem('lobbyId');

    this.lobbyService.getLobbyList().subscribe({
      next: (data) => {
        this.lobbyList = data;
      },
      error: (error) => {
        console.log(error);
      },
    });


    this.cpuValue$ = this.signalRService.newCpuValue$;
    this.signalrConnectionEstablished$ = this.signalRService.connectionEstablished$;

    this.signalRService.messageReceived$.subscribe((message) => {
      this.chatmessages.push(message);
    });



  }

  sendMessage() {
    //this.sendChat.emit(new ChatMessage(this.form.value.usermessage + " says: " + this.form.value.chatmessage));
    this.signalRService.sendChatMessage(new ChatMessage(this.form.value.usermessage + " says: " + this.form.value.chatmessage));
    this.form.reset();
  }





  sendControls(control?: string) {
    //this.sendChat.emit(new ChatMessage(control));
    this.signalRService.sendChatMessage(new ChatMessage(control));
    this.form.reset();
  }


  createClient() {
    let client: Client = {
      name: this.playerName,
      lobbyId: '5403116f-4df7-4179-a2d2-23a3f73a6d92',
      created: new Date().toISOString()
    };
    //console.log(new Client('Vardas', '5403116f-4df7-4179-a2d2-23a3f73a6d92'))
    this.signalRService.createClient(client);
  }

  play(lobbyId: string){
    if(!this.playerName || this.playerName.replace(/\s/g, '').length <= 5)
    {
      Swal.fire({
        icon: 'error',
        title: 'Invalid name',
        text: 'Please choose your name with at least 5 characters',
      })
      return;
    }

    if(this.getLobbyPlayerCount(lobbyId) == 2){
      Swal.fire({icon: 'error', title: 'Sorry', text: 'Lobby is full'})
      return;
    }

    let client: Client = {
      name: this.playerName,
      lobbyId: lobbyId,
      created: new Date().toISOString()
    };
    this.signalRService.createClient(client);
    client = this.signalRService.createdClient;

    //fix here - sinc problem
    this.lobbyService.addPlayerToLobby(lobbyId, client.id!).subscribe({
      next: (data) => {
        sessionStorage.setItem('playerId', client.id!);
        sessionStorage.setItem('playerName', this.playerName);
        sessionStorage.setItem('lobbyId', lobbyId);

        this.router.navigate(['/game', lobbyId]).then(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        if(error.status == 406){
          this.lobbyService.getLobbyList().subscribe({
            next: (data) => {
              this.lobbyList = data;
              Swal.fire({icon: 'error', title: 'Sorry', text: 'Lobby is full'})
            },
            error: (error) => {
              console.log(error);
            },
          });
        }
        else{
          console.log(error);
          Swal.fire({icon: 'error', title: error.status, text: error.message})
        }

      }})

  }


  saveToLocalStorage(){
    sessionStorage.setItem('playerName', this.playerName);
  }

  getFromLocalStorage(){
    console.log(sessionStorage.getItem('playerName'));
  }

  getLobbyPlayerCount(id: string){
    var lobby = this.lobbyList.find(function(element) {
      return element.id === id;
    });
    if(lobby?.player1 != null && lobby?.player2 != null){
      return 2;
    }
    else if(lobby?.player1 != null || lobby?.player2 != null){
      return 1;
    }
    return 0;

  }

}
