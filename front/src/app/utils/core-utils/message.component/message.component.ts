import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '@appModels/message';

@Component({
  selector: 'yap-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() message!: Message;
  @Input() currentUserId: string | null = null;

  @Output() reply = new EventEmitter<Message>();
  @Output() remove = new EventEmitter<Message>();

  isMine(): boolean {
    return !!this.currentUserId && this.message.senderId === this.currentUserId;
  }

  onReply() {
    this.reply.emit(this.message);
  }

  onRemove() {
    this.remove.emit(this.message);
  }
}
