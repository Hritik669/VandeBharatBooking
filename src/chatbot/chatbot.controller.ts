import {classifier} from './training.data'
import { Response } from '../const/response';

export class chatbot{
    static async getReply(userInput){
        const response = classifier.classify(userInput);
        return Response.sendResponse(`${response}`,203,{response});
    }
}