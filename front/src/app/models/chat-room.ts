import { User } from "@appModels/user";
import { Message } from "@appModels/message";

export interface ChatRoom {
  id: string;
  name: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
}
