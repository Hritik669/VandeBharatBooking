import { Request, ResponseToolkit } from '@hapi/hapi';
import { SessionModel } from '../models/session.model';
import { Response } from '../core/response';

export class Sessions{
  static async sessionEntry(device: string, user: any, userSession: any) {
    try {
      if (user) {
        if (!userSession) {
          const session_details = new SessionModel({
            user_id: user.id,
            device_id: device,
            status: true
          });
          const session = await session_details.save();
          console.log("Session stored successfully");
          console.log(session);
        } else if (userSession) {
          if (!userSession.status) {
            await SessionModel.findOneAndUpdate({ user_id: user.id }, { status: !userSession.status });
            console.log("Session Activate");
          }
        }
      } else {
        console.log("User not found");
        return Response.sendResponse("User Not Found",404,{});
      }
    } catch (err) {
      console.log("Server Error", err);
      return Response.sendResponse("Server Error",500,{});
    }
  }
}

