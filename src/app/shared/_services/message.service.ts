import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
 messages: object[] = [];

  add(message: string) {
    const messageArray = { text: message, style: 'alert-primary'};
    this.messages.push(messageArray);
  }

  addWithStyle(message: string, style: string) {
    const messageArray = { text: message, style: style};
    this.messages.push(messageArray);
  }

  clear() {
    this.messages = [];
  }
}
