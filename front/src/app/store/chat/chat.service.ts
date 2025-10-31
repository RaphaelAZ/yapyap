import { Injectable } from '@angular/core';
import { Message } from '@appModels/*';
import { authQuery } from '@appStore/auth/auth.query';
import { environment } from '@environments/environment';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private hubConnection: signalR.HubConnection | undefined;

  public messages$ = new BehaviorSubject<Message[]>([]);

  initConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/chathub`, {
        withCredentials: true,
        accessTokenFactory: async () => {
          const user = await firstValueFrom(authQuery.user$);
          return user?.token || '';
        }
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection.on('LoadOldMessages', (messages) => {
      this.messages$.next(messages);
    });

    this.hubConnection.on('ReceiveMessage', (message) => {
      this.messages$.next([...this.messages$.value, message]);
    });

    this.hubConnection.start().then(() => {
      console.log('SignalR connecté')
    }).catch((err) => {
      console.log('Erreur : ' + err);
    });
  }

  sendMessage(receiver: string, content: string) {
    this.hubConnection!.invoke('SendMessage', receiver, content)
      .catch(err => console.error('Send error:', err));
  }

  joinConversation(userId: string) {
    this.hubConnection!.invoke('JoinConversation', userId)
      .catch(err => console.error('Join error:', err));
  }
}
