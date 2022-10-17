import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin  } from 'rxjs';
import { SignalRService } from '../core/services/signalR.service';
import { ChatMessage } from '../models/chatMessage.model';
import { map, tap } from 'rxjs/operators';
import { ChatComponent } from '../presentational/chat/chat.component';
import {
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/table';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { LobbyService } from '../core/services/lobby.service';
import { Lobby } from '../models/game.types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  displayedColumns = ['message']

  cpuValue$: Observable<number>;
  signalrConnectionEstablished$: Observable<boolean>;
  chatmessages: ChatMessage[] = [];

  public form: FormGroup;
  user: string = '';

  lobbyDisplayedColumns = ['name', 'players']
  lobbyList: Lobby[];



  constructor(
    private readonly signalRService: SignalRService,
    formbuilder: FormBuilder,
    private lobbyService: LobbyService
  ) {
    this.form = formbuilder.group({
      chatmessage: ['', Validators.required],
      usermessage: ['', Validators.required]
    });
  }


  ngOnInit() {

    this.lobbyService.getLobbyList().subscribe({
      next: (data) => {
        this.lobbyList = data;
        console.log(this.lobbyList);
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


  saveToLocalStorage(){
    sessionStorage.setItem('name', this.user);
  }

  getFromLocalStorage(){
    console.log(sessionStorage.getItem('name'));
  }

  getLobbyPlayerCount(id?: number){
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
