import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { EventModel, GuestModel, MessageModel } from './../_models';

import { RoomModel } from './../_models/room.model';

import { environment } from './../../../environments/environment';

import * as socketIo from 'socket.io-client';

const SERVER_URL = environment.SERVER_URL;

@Injectable()
export class SocketService {
    private socket;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public send(message: MessageModel): void {
        this.socket.emit('message', message);
    }

    public guest(guest: GuestModel): void {
        this.socket.emit('guest', guest);
    }

    public onMessage(): Observable<MessageModel> {
        return new Observable<MessageModel>(observer => {
            this.socket.on('message', (data: MessageModel) => observer.next(data));
        });
    }

    public onRoom(): Observable<RoomModel> {
        return new Observable<RoomModel>(observer => {
            this.socket.on('room', (data: RoomModel) => observer.next(data));
        });
    }

    public onEvent(event: EventModel): Observable<any> {
        return new Observable<EventModel>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
