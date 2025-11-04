import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { authQuery } from '@appStore/auth/auth.query';
import { MessageComponent } from "@appUtils/core-utils/message.component/message.component";
import { ChatService } from '@appStore/chat/chat.service';
import { ActivatedRoute } from '@angular/router';

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
  protected chatService = inject(ChatService);
  protected fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  form: FormGroup;
  authQuery = authQuery;

  constructor() {
    this.form = this.fb.group({
      message: ['']
    });
  }

  ngOnInit() {
    this.chatService.joinConversation(this.route.snapshot.paramMap.get('id')!);
  }

  send() {
    const content = this.form.get('message')?.value;
    this.chatService.sendMessage(this.route.snapshot.paramMap.get('id')!, content);
    this.form.reset();
  }

  onReply(message: any) {
    console.log('reply', message);
  }

  onRemove(message: any) {
    console.log('remove', message);
  }
}
