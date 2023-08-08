import { Request, ResponseToolkit } from '@hapi/hapi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const key = process.env.SECRET_KEY;

export class Auth {
    static async verify_token(token) {
        // const token = req.headers.authorization;
        // console.log(token);
        if (token) {
            const decoded = jwt.verify(token, key);
            return decoded;
        } else {
            return false;
        }
    }

    static async generate_hash_pass(password: string) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
}

export default Auth;