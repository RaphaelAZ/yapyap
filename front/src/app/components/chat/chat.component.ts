import { Component, OnInit } from '@angular/core';
import { ChatService } from '@appServices/chat.service';

@Component({
  selector: 'app-chat',
  imports: [],
  templateUrl: 'chat.component.html',
})
export class ChatComponent implements OnInit {
  message = '';

  constructor(protected chatService: ChatService) {}

  ngOnInit() {
    this.chatService.initConnection();
  }

  send() {
    this.chatService.sendMessage('Raphael', '', this.message);
    this.message = '';
  }
}
