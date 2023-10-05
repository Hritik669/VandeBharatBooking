import { UserModel } from "../models/user.model";
import { SessionModel } from '../models/session.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Sessions } from './session.controller';
import { del_otp, get_otp, logout_session_redis, maintainSession } from '../redis/redis.middleware';
import { Auth } from '../middleware/decode';
import { Response } from '../const/response';
import * as redis from 'redis';
import { SetOptions } from "redis";
import nodemailer from 'nodemailer';

export class UserOperation {

  static async userSignUp(payload) {
    try {
      const { username, password, email, role } = payload;
      const existingUser = await UserModel.findOne({ username, password, email, role });

      if (existingUser) {
        return Response.sendResponse("User already exists", 403, {});
      }
      const userWithoutPassword = await UserModel.findOne({ email });
      const hashpassword = await Auth.generate_hash_pass(password);
      if (userWithoutPassword) {
        let data = await UserModel.updateOne({ email }, {
          $set: {
            password: hashpassword
          }
        });
        return Response.sendResponse("User Register Successfully", 201, { data });
      }
      else {
        const user_details = new UserModel({ username, password: hashpassword, email, role });
        const userDetails = await user_details.save();

        return Response.sendResponse("User Register Successfully", 201, { userDetails });
      }
    } catch (error) {
      console.error("userSignUp error: ", error);
      return Response.sendResponse("Server Error", 500, {});
    }
  }


  static async userLogin(email, password, device) {
    try {
      const user = await UserModel.findOne({ email, password });
      if (!user) {
        return Response.sendResponse("User not found or you sign in through google please signup first", 404, {});
      }
      const userSession = await SessionModel.findOne({ user_id: user._id });
      if (userSession?.status) {
        return Response.sendResponse("User is already active", 404, {});
      }
      const hash = user.password;
      const passwordMatch = await bcrypt.compare(password, hash);
      if (!passwordMatch) {
        return Response.sendResponse("Password is incorrect", 404, {});
      }
      const forToken = { email, role: user.role };
      const token = jwt.sign(forToken, process.env.SECRET_KEY, { expiresIn: '10h' });
      await Sessions.sessionEntry(device, user, userSession);
      await maintainSession(user, device);
      return Response.sendResponse("Login successfully", 201, { user, token });
    } catch (error) {
      console.error("userLogin error: ", error);
      return Response.sendResponse("Server Error", 500, {});
    }
  }


  static async logout_user(token) {
    try {
      const userToken: any = await Auth.verify_token(token);
      const user = await UserModel.findOne({ email: userToken.email });

      if (!user) {
        return Response.sendResponse("User not found", 404, {});
      }

      const userSession = await SessionModel.findOne({ user_id: user._id });

      if (!userSession || !userSession.status) {
        return Response.sendResponse("User is already inactive", 404, {});
      }

      await logout_session_redis(user);

      await SessionModel.findOneAndUpdate(
        { _id: userSession._id },
        { status: !userSession.status }
      );

      return Response.sendResponse("User logOut Successfully", 201, {});
    } catch (error) {
      console.error("logout_user error: ", error);
      return Response.sendResponse("Server Error", 500, {});
    }
  }


  static async getUser(token) {
    try {
      const userToken: any = await Auth.verify_token(token);
      const user = await UserModel.findOne({ email: userToken.email });
      if (!user) {
        return Response.sendResponse("User doesn't exist", 403, {});
      }
      return Response.sendResponse("User detail", 201, { user });
    } catch (error) {
      console.error("getUser error: ", error);
      return Response.sendResponse("Server Error", 500, {});
    }
  }

  static async change_password(email, previousPassword, newPassword) {
    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        return Response.sendResponse('User not found', 404, {});
      }
      const passwordMatch = await bcrypt.compare(previousPassword, user.password);
      if (!passwordMatch) {
        return Response.sendResponse('Incorrect previous password', 400, {});
      }
      if (newPassword === previousPassword) {
        return Response.sendResponse('New password cannot be the same as the previous password', 400, {});
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      await UserModel.updateOne({ email }, { $set: { password: hashedPassword } });
      return Response.sendResponse('Password changed successfully', 200, {});
    } catch (error) {
      console.error(error);
      return Response.sendResponse('Internal Server Error', 500, {});
    }
  }


  static async forgotPassword(details) {
    return new Promise(async (resolve, reject) => {
      try {

        const client = await redis.createClient();
        await client.connect();

        const user = await UserModel.findOne({ email: details.email });
        console.log(user)
        if (!user) {
          return 0;
        }
        let OTP = Math.floor(1000 + Math.random() * 9000);
        const options: SetOptions = { EX: 100 };
        await client.set(details.email, OTP.toString(), options);
        console.log("otp set to redis")

        const transporter = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_ADDRESS,
          to: details.email,
          subject: 'Password Reset Request',
          text: `You are receiving this email because you (or someone else) has requested a password reset for your account.\n\n
                Please paste this into your browser to complete the process:\n\n
                ${process.env.CLIENT_URL}/RESET PASSWORD OTP: ${OTP}\n\n
                If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            return resolve(Response.sendResponse("error sending mail", 500, {}));
          } else {
            console.log("Email sent: " + info.response);
            return resolve(Response.sendResponse("mail send", 201, {}));
          }
        });
      }
      catch (err) {
        return resolve(Response.sendResponse("Server Error", 500, {}))
      }
    });
  }


  static async reset_password(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const user: any = await UserModel.findOne({ email: payload.email });

        if (!user) {
          return resolve(Response.sendResponse("Invalid User", 403, {}))
        }

        const userOTP = await get_otp(payload.email);
        console.log("--------", userOTP);
        if (!userOTP || userOTP !== payload.otp) {
          return resolve(Response.sendResponse("Invalid OTP", 403, {}))
        }

        console.log(user.password);
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(payload.newPassword, salt);
        user.password = hashpassword
        console.log(user.password);
        const updatedUser = await user.save();
        if(updatedUser){
          del_otp(payload.email);
        }
        return resolve(Response.sendResponse("password reset successfully", 201, {}))
      }
      catch (error) {
        console.log(error);
        return resolve(Response.sendResponse("Server error", 500, {}))
      }
    });
  }
}