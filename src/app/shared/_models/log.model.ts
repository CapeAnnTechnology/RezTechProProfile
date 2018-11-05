import {ActionModel} from './action.model';

export interface LogModel {
 // userId: String,
 action: ActionModel;
 data: String;
 // ipAddress: String,
 // userAgent: String,
 // referrer: String,
 timestamp: { type: Date, required: true };
 // viewPublic: Boolean,
 // additional: [],
 // fileName: String,
 // level: { type: Number, required: true },
 // lineNumber: String,
 // message: String
}

