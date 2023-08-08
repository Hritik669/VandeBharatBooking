//Mongoose model for a collection --> stops

import { Schema,model } from "mongoose";

interface stop{
    stop_name:string;
}

const StopSchema = new Schema<stop>({
    stop_name: {type: String, required:true}
})

export const StopModel = model<stop>('stops', StopSchema);