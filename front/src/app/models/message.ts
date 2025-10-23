import { User } from '@appModels/user';

export interface Message {
  id: string;
  content: string;
  senderId: string;
  sender: User;
  timestamp: Date;
  isRead: boolean;
  type: 'text' | 'image' | 'file';
}
