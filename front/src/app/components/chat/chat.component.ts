import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../store/chat/chat.service';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { authQuery } from '@appStore/auth/auth.query';
import { MessageComponent } from "@appUtils/core-utils/message.component/message.component";
import { Message } from '@appModels/*';

@Component({
  selector: 'app-chat',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MessageComponent
],
  templateUrl: 'chat.component.html',
})
export class ChatComponent implements OnInit {
  form: FormGroup;
  authQuery = authQuery;

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
    const content = this.form.get('message')?.value;
    firstValueFrom(authQuery.user$).then(user => {
      const senderId = user!.userId;
      this.chatService.sendMessage('', content);
      this.form.reset();
    });
  }

  onReply(message: any) {
    console.log('reply', message);
  }

  onRemove(message: any) {
    console.log('remove', message);
  }
}
