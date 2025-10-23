import { Component, OnInit } from '@angular/core';
import { ChatService } from '@appServices/chat.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [ReactiveFormsModule],
  templateUrl: 'chat.component.html',
})
export class ChatComponent implements OnInit {
  form: FormGroup;

  constructor(
    protected fb: FormBuilder,
    protected chatService: ChatService
  ) {
    this.form = this.fb.group({
      message: ['']
    });
  }

  ngOnInit() {
    this.chatService.initConnection();
  }

  send() {
    this.chatService.sendMessage('Raphael', '', this.form.get('message')?.value);
    this.form.reset();
  }
}
