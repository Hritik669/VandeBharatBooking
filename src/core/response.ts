export class Response{
    static async sendResponse(message:string,code:number,data:any){
        return {
            message: message,
            code: code,
            data: data
        }
    }
}