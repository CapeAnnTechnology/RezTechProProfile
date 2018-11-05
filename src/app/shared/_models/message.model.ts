import {UserModel} from './user.model';
import {ActionModel} from './action.model';

export interface MessageModel {
    from?: UserModel;
    content?: any;
    action?: ActionModel;
}
