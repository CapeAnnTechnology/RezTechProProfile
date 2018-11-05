import {ActionModel} from './action.model';

export interface GuestModel {
    roomId: String;
    capacity: number;
    action?: ActionModel;
}
