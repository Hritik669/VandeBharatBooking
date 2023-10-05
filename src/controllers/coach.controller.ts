import { CoachModel, TrainRouteModel } from "../models";
import { TrainModel } from "../models";
import { Response } from "../const/response";

export class CoachOperation {

  static async addCoach(detail) {
    try {
      const trainId = detail.trainId;

      const [existingCoach, train] = await Promise.all([
        CoachModel.findOne({ coachNumber: detail.coachNumber, trainId }),
        TrainModel.findOne({ _id: trainId }),
      ]);

      if (train.no_of_coaches >= 8 || existingCoach) {
        return Response.sendResponse("Number of coaches should be less than 8 or coach already exists", 403, {});
      } else {
        const coachData = await CoachModel.create(detail);
        const updatedTrain = await TrainModel.findOneAndUpdate({ _id: trainId }, { $inc: { no_of_coaches: 1 } });
        return Response.sendResponse("Coach registered successfully", 201, { coachData, updatedTrain });
      }
    } catch (error) {
      console.error(error);
      return Response.sendResponse("Server error", 500, {});
    }
  }

  
  static async deleteCoach(coach) {
    try {
      const coachData = await CoachModel.findOne({ coachNumber: coach });
      const trainId = coachData.trainId;

      const train = await TrainModel.findOne({ _id: trainId });

      if (coachData) {
        const deletedCoach = await CoachModel.deleteOne({ coachNumber: coach });
        const updatedTrain = await TrainModel.findOneAndUpdate({ _id: trainId }, { $inc: { no_of_coaches: -1 } });
        return Response.sendResponse("Coach deleted successfully", 201, { deletedCoach, updatedTrain });
      }

      return Response.sendResponse("Coach doesn't exist", 403, {});
    } catch (error) {
      console.error(error);
      return Response.sendResponse("Server error", 500, {});
    }
  }

  static async updateCoach(coach, detail) {
    try {
      const existingCoach = await CoachModel.findOne({ _id: coach });

      if (existingCoach) {
        const updatedCoach = await CoachModel.updateOne({ _id: coach }, {
          $set: {
            trainId: detail.trainId,
            coachNumber: detail.coachNumber,
            no_of_seat: detail.no_of_seat,
          },
        });

        return Response.sendResponse("Coach updated successfully", 201, { updatedCoach });
      } else {
        return Response.sendResponse("Coach doesn't exist", 403, {});
      }
    } catch (error) {
      console.error(error);
      return Response.sendResponse("Server error", 500, {});
    }
  }

  
  static async getCoach(coach){
    try {
      const coachdata = await CoachModel.aggregate([
        {
          $match:{coachNumber:{$eq:coach}}
        },
        {
          $lookup:{
            from:'seats',
            localField:'_id',
            foreignField:'coachId',
            as:'Seats'
          }
        }
      ])

      console.log(JSON.stringify(coachdata));
      
      if(coachdata){
        return Response.sendResponse("coach detail",201,{coachdata});
      }else{
        return Response.sendResponse("coach doesn't exist",403,{})
      }
    } catch (error) {
      console.log(error);
      return Response.sendResponse("Server error", 500, {});
    }
  }
}




// static async trainDetail(coachId, routeId) {
//   try {
//     const coach = await CoachModel.findOne({_id: coachId });
//     console.log(coach);

//     let detailData = [coach.trainId, coach.coachNumber, coach.no_of_seat];
//     detailData = detailData.map((data, index) => {
//       let message = "";
//       switch (index) {
//         case 0:
//           message = `Train ID: ${data}`;
//           break;
//         case 1:
//           message = `Coach Number: ${data}`;
//           break;
//         case 2:
//           message = `Total number of Seats: ${data}`;
//           break;
//         default:
//           message = `Unknown data: ${data}`;
//       }
//       return message;
//     })

//     console.log(detailData);

//     return Response.sendResponse("Train deatails", 201, { detailData });
//   }
//   catch (error) {
//     console.log(error);
//     return Response.sendResponse("Server error", 500, {});
//   }
// }