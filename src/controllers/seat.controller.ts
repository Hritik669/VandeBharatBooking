import { SeatModel } from "../models";
import { Response } from "../const/response";

export class seatOperation {
    static async addSeat(detail) {
        try {
            const seatdata = await SeatModel.findOne({ coachId: detail.coachId, trainId: detail.trainId, seatNumber: detail.seatNumber });
            if (seatdata) {
                return Response.sendResponse("Seat already exist", 201, {});
            }
            const seat = await SeatModel.create(detail);
            return Response.sendResponse("Seat register successfully", 201, { seat });
        } catch (error) {
            console.log(error);
            return Response.sendResponse("Server Error", 500, {});
        }
    }

    static async getSeat(seat) {
        try {
            const seatdata = await SeatModel.findOne({ seatNumber: seat });
            if (!seatdata) {
                return Response.sendResponse("Seat doesn't exist", 403, {});
            }
            console.log(seatdata);
            return Response.sendResponse("Seat detail", 201, { seatdata });
        } catch (error) {
            console.error(error);
            return Response.sendResponse("Server Error", 500, {});
        }
    }

    static async deleteSeat(seat) {
        try {
            const seatdata = await SeatModel.findOne({ _id: seat })
            if (seatdata) {
                await SeatModel.deleteOne({ seatNumber: seat });
                return Response.sendResponse("seat delete successfully", 201, {})
            }
            return Response.sendResponse("Seat doesn't exist", 403, {});
        } catch (error) {
            console.log(error);
            return Response.sendResponse("Server Error", 500, {});
        }
    }

    static async updateSeat(seat, detail) {
        const seatnum = await SeatModel.findOne({ _id: seat });
        if (seatnum) {
            await SeatModel.updateOne({ _id: seat }, {
                $set: {
                    coachId: detail.coachId,
                    trainId: detail.trainId,
                    seatNumber: detail.seatNumber
                }
            });
            return Response.sendResponse("Seat update successfully", 201, {});
        }
        else {
            return Response.sendResponse("seat doesn't exit", 403, {});
        }
    } catch(error) {
        console.log(error);
        return Response.sendResponse("Server error", 500, {});
    }
}