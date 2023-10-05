//Mongoose model for a collection --> trains

import { Schema,model } from "mongoose";

interface Train{
    trainNumber: string;
    routeId: Schema.Types.ObjectId;
    destination: string;
    no_of_coaches:number;
}

const TrainSchema = new Schema<Train>({
    trainNumber: {type: String,required:true},
    routeId: {type: Schema.Types.ObjectId,ref:'routes',required:true},
    destination:{type: String,required:true},
    no_of_coaches:{type: Number,required:true},
})

export const TrainModel = model<Train>('trains',TrainSchema);
