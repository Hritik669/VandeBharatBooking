//Mongoose model for a collection --> booking

import { Schema,model } from "mongoose";

interface Booking {
    userId: Schema.Types.ObjectId;
    trainId: Schema.Types.ObjectId;
    coachId: Schema.Types.ObjectId;
    seats: {
        seatNumber: string;
    }[];
    bookingDate: Date;
}

const seatsSchema = new Schema({
    seatNumber: {type: String,required:true}
})

const bookingSchema = new Schema<Booking>({
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    trainId: { type: Schema.Types.ObjectId, ref: 'trains', required: true },
    coachId: { type: Schema.Types.ObjectId, ref: 'coaches', required: true },
    seats: [{ type: seatsSchema, required: true }],
    bookingDate: { type: Date, required: true },
  });
  
  export const BookingModel = model<Booking>('booking', bookingSchema);