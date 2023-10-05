import { SessionModel } from '../models/session.model';
import { Response } from '../const/response';

export class Sessions {
  static async sessionEntry(device: string, user, userSession) {
    try {
      if (!user) {
        console.log("User not found");
        return Response.sendResponse("User Not Found", 404, {});
      }

      if (!userSession) {
        const sessionDetails = new SessionModel({
          user_id: user.id,
          device_id: device,
          status: true
        });
        const session = await sessionDetails.save();
        console.log("Session stored successfully");
        console.log(session);
      } else if (!userSession.status) {
        await SessionModel.findOneAndUpdate({ user_id: user.id }, { status: true });
        console.log("Session Activate");
      }
    } catch (err) {
      console.error("Server Error", err);
      return Response.sendResponse("Server Error", 500, {});
    }
  }
}
