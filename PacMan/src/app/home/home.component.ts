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


  constructor(
    private readonly signalRService: SignalRService,
    formbuilder: FormBuilder
  ) {
    this.form = formbuilder.group({
      chatmessage: ['', Validators.required],
      usermessage: ['', Validators.required]
    });
  }

  ngOnInit() {
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

}
