//Mongoose model for a collection --> routes

import { Schema,model } from "mongoose";

interface TrainRoutes{
    start_point:string;
    stop_point:{
        stopId: Schema.Types.ObjectId;
        order:number;
    }[];
    end_point:string;
};

const stopPointSchema =new Schema({
    stopId: {type: Schema.Types.ObjectId,ref:'stops',required:true},
    order:{type:Number,required:true}
});

const TrainRouteSchema = new Schema({
    start_point: {type:String,required:true},
    stop_point: [stopPointSchema],
    end_point: {type:String,required:true}
});

export const TrainRouteModel =model<TrainRoutes>('trainRoutes',TrainRouteSchema);