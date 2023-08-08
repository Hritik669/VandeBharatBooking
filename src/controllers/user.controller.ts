import { UserModel } from "../models/user.model";
import { SessionModel } from '../models/session.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Sessions } from './session.controller';
import { logout_session_redis, maintainSession } from '../middleware/redis.middleware';
import { Auth } from '../middleware/decode';
import { Response } from '../core/response';


export class UserOperation {

  static async userSignUp(payload) {
    const details = payload;
    try {
      const user = await UserModel.findOne({ username: details.username });
      console.log("user  ", user);
      if (!user) {
        const hashpassword = await Auth.generate_hash_pass(details.password);
        const user_details = new UserModel({
          username: details.username,
          password: hashpassword,
          email: details.email,
          role: details.role,
        });
        const Details = await user_details.save();
        console.log(Details);
        return Response.sendResponse("User Register Successfully",201,{});
      }
      else {
        console.log("user  12");
        return Response.sendResponse("User already exist",403,{});
      }
    }
    catch (err) {
      console.log("user  ", err);
      return Response.sendResponse("Server Error",500,{});
    }
  }


  static async userLogin(email, role, password, device) {
    const forToken = { email, role };
    try {
      const user = await UserModel.findOne({ email });
      console.log(user);
      if (user) {
        const userSession = await SessionModel.findOne({ user_id: user._id });
        console.log(userSession);
        if (!userSession?.status) {
          const hash = user.password;
          if (await bcrypt.compare(password, hash)) {
            const token = jwt.sign(forToken, process.env.SECRET_KEY);
            console.log(token);
            await Sessions.sessionEntry(device, user, userSession);
            await maintainSession(user, device);
            return Response.sendResponse("login successfully",201,{user,token});
          }
          else {
            return Response.sendResponse("password is incorrect",404,{});
          }
        }
        else {
          return Response.sendResponse("User is already active",404,{});
        }
      } else {
        return Response.sendResponse("user not found",404,{});
      }
    } catch (error) {
      console.log(error);
      return Response.sendResponse("Server Error",500,{});
    }
  }

  

  static async logout_user(token) {
    try {
      const userToken = await Auth.verify_token(token);
      const user = await UserModel.findOne({ email: userToken.email });
      console.log(user);
      if (user) {
        const userSession = await SessionModel.findOne({ user_id: user.id });
        console.log(userSession);
        if (userSession) {
          if (userSession.status) {
            await logout_session_redis(user);
            const updatedUserSession = await SessionModel.findOneAndUpdate(
              { _id: userSession.id },
              { status: !userSession.status }
            );
            console.log(updatedUserSession);
            return Response.sendResponse("User logOut Successfully",201,{});
          } else {
            return Response.sendResponse("User is already inactive",404,{});
          }
        }
      } else {
        return Response.sendResponse("User not found",404,{});
      }
    } catch (err) {
      return Response.sendResponse("Server Error",500,{});
    }
  }
}