import { StopModel } from '../models';
import { Response } from '../const/response';

export class StopOperation {
    static async addStop(detail) {
        try {
            const existingStop = await StopModel.findOne({ stop_name: detail.stop_name });
            if (existingStop) {
                return Response.sendResponse("Stop already exists", 403, {});
            }
            await StopModel.create(detail);
            return Response.sendResponse("Stop registered successfully", 201, {});
        } catch (error) {
            console.error(error);
            return Response.sendResponse("Server error", 500, {});
        }
    }

    static async getStop(stop) {
        try {
            const stopDetail = await StopModel.findOne({ stop_name: stop });
            if (!stopDetail) {
                return Response.sendResponse("Stop doesn't exist", 403, {});
            }
            return Response.sendResponse("Stop detail", 201, { stopDetail });
        } catch (error) {
            console.error(error);
            return Response.sendResponse("Server error", 500, {});
        }
    }

    static async deleteStop(stop) {
        try {
            const stopName = await StopModel.findOne({ stop_name: stop });
            if (stopName) {
                await StopModel.deleteOne({ stop_name: stop });
                return Response.sendResponse("Stop delete successfully", 201, {});
            }
            else {
                return Response.sendResponse("Stop doesn't exit", 403, {});
            }
        } catch (error) {
            console.log(error);
            return Response.sendResponse("Server error", 500, {});
        }
    }

    static async updateStop(detail) {
        const stopNme = await StopModel.findOne({ stop_name: detail.stop });
        if (stopNme) {
            await StopModel.updateOne({ stop_name: detail.stop }, { stop_name: detail.newStop });
            return Response.sendResponse("Stop update successfully", 201, {});
        }
        else {
            return Response.sendResponse("Stop doesn't exit", 403, {});
        }
    } catch(error) {
        console.log(error);
        return Response.sendResponse("Server error", 500, {});
    }

}