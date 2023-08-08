import { Response } from '../core/response';
import { TrainRouteModel } from '../models';

export class trainRouteOperation {
    static async addTrainRoute(detail) {
        try {
            await TrainRouteModel.create(detail);
            return Response.sendResponse("TrainRoute register successfully", 201, {});
        } catch (error) {
            console.log(error);
            return Response.sendResponse("Server Error", 500, {});
        }
    }
}