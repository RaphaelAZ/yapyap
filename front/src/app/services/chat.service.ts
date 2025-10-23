import { Injectable } from '@angular/core';
import { Message } from '@appModels/*';
import * as signalR from '@microsoft/signalr';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private hubConnection: signalR.HubConnection | undefined;

  public messages: Message[] = [];

  initConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5234/chathub', {
        withCredentials: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection.start().then(() => {
      console.log('SignalR connecté')
    }).catch((err) => {
      console.log('Erreur : ' + err);
    })

    this.hubConnection.on('ReceiveMessage', (msg) => {
      this.messages.push(msg);
    });
  }

  sendMessage(sender: string, receiver: string, content: string) {
    this.hubConnection!.invoke('SendMessage', sender, receiver, content)
      .catch(err => console.error('Send error:', err));
  }
}
