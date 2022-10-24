import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr';
import { BehaviorSubject, Subject } from 'rxjs';
import { ChatMessage } from 'src/app/models/chatMessage.model';
import { Client } from 'src/app/models/game.types';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  createdClient: Client = { name: '' };
  clientStatusCode: string = '';

  foodchanged$ = new Subject();
  messageReceived$ = new Subject<ChatMessage>();
  newCpuValue$ = new Subject<number>();
  connectionEstablished$ = new BehaviorSubject<boolean>(false);

  private hubConnection!: HubConnection;

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  sendChatMessage(message: ChatMessage) {
    this.hubConnection.invoke('SendMessage', message);
  }

  createClient(client: Client) {
    this.hubConnection.invoke('CreateClient', client);
  }

  connectClientToLobby(clientId: string, lobbyId: string) {
    this.hubConnection.invoke('ConnectClientToLobby', clientId, lobbyId);
  }
  disconnectClientFromLobby(clientId: string, lobbyId: string) {
    this.hubConnection.invoke('DisconnectClientFromLobby', clientId, lobbyId);
  }

  private createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(environment.baseUrls.server + 'pacman')
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
  }

  private startConnection() {
    if (this.hubConnection.state === HubConnectionState.Connected) {
      return;
    }

    this.hubConnection.start().then(
      () => {
        console.log('Hub connection started!');
        this.connectionEstablished$.next(true);
      },
      (error) => console.error(error)
    );
  }

  private registerOnServerEvents(): void {
    this.hubConnection.on('FoodAdded', (data: any) => {
      //console.log(data);
      this.foodchanged$.next(data);
    });

    this.hubConnection.on('FoodDeleted', (data: any) => {
      //console.log(data);
      this.foodchanged$.next('this could be data');
    });

    this.hubConnection.on('FoodUpdated', (data: any) => {
      //console.log(data);
      this.foodchanged$.next('this could be data');
    });

    this.hubConnection.on('Send', (data: any) => {
      //console.log('data', data);
      this.messageReceived$.next(data);
    });

    this.hubConnection.on('newCpuValue', (data: number) => {
      this.newCpuValue$.next(data);
    });

    this.hubConnection.on('ClientCreated', (data: any) => {
      this.createdClient = data;
    });

    this.hubConnection.on('ClientUpdated', (data: any) => {
      this.clientStatusCode = data;
    });
    this.hubConnection.on('SignalRCreated', (data: any) => {
      console.log('SignalR !!!!!!!!!!!!!!!!!!!!!!!' + data);
    });
  }
}
