import { Request, ResponseToolkit } from '@hapi/hapi';
import { TrainModel } from '../models';

export class trainOperatio{
    static async createTrain(req:Request,h:ResponseToolkit){
        const detail= req.payload as any;
        try {
            const train = await TrainModel.findOne({trainNumber:detail.trainNumber});
            console.log(train);
            if(!train){
                await TrainModel.create(detail);
                return h.response({status:"train register successfully"}).code(201);
            }
            else{
                return h.response({status:"train already exit"}).code(403);
            }
        } catch (error) {
            console.log(error);
            return h.response({ status: "Server Error" }).code(500);
        }
    }
}