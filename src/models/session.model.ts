//Mongoose model for a collection --> sessions

import { Schema, model } from 'mongoose';

interface Session {
    user_id: Schema.Types.ObjectId;
    device_id: string;
    status:boolean;
  }

const SessionSchema = new Schema<Session>({
  user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  device_id: { type: String},
  status: {type: Boolean, required:true}
});

export const SessionModel = model<Session>('session', SessionSchema);
