// // import { logWithColor } from './logWithColor';
// // import { getLogFileName, writeToLogFile } from './create.file';
// // const fetch = require("node-fetch");
// import fetch from "node-fetch";
// async function logError(msg: string) {
//     // ...
// }
// async function logInfo(msg: string) {
//     // ...
// }
// async function logWarn(msg: string) {
//     // ...
// }
// function getClientIP(request) {
//     if (request && request.ip) {
//         return request.ip;
//     }
//     if (request && request.info && request.info.remoteAddress) {
//         return request.info.remoteAddress;
//     }
//     if (request && request.clientIP) {
//         return request.clientIP;
//     }
//     if (request && request.ip) {
//         return request.ip;
//     }
//     return 'Unknown';
// }
// async function createApiLogger(req: any, startTime?: Date) {
//     const logData = {
//         Timestamp: '',
//         Method: '',
//         Path: '',
//         RouteParams:{},
//         Query: {},
//         Headers: {},
//         Body: {},
//         ClientIP: '',
//         TimeDifference: '',
//         Error: null
//     };
//     try {
//         const timestamp = new Date();
//         const timeDifference = startTime ? timestamp.getTime() - startTime.getTime() : null;
//         const clientIP = getClientIP(req);
//         logData.Timestamp = timestamp.toISOString();
//         logData.Method = req.method;
//         logData.Path = req.url;
//         logData.RouteParams= req.params;
//         logData.Query = req.query || {};
//         logData.Headers = req.headers;
//         logData.Body = req.body || req.payload || {};
//         logData.ClientIP = clientIP || {};
//         logData.TimeDifference = startTime
//             ? `The time difference is ${timeDifference} milliseconds.`
//             : 'startTime is required for the timeDifference';
//         const logEntry = JSON.stringify(logData, null, 2);
//         console.log(logEntry);
//         // const logFileName = await getLogFileName('api_detail', 'log');
//         // await writeToLogFile(logEntry, logFileName);
//     } catch (error:any) {
//         // If an error occurs, populate the "Error" field in logData
//         logData.Error = error.message;
//         // Log the entire logData object, including the error, to a dedicated error log file
//         // const errorLogFileName = await getLogFileName('api_error', 'log');
//         const errorLogEntry = JSON.stringify(logData, null, 2);
//         console.log(errorLogEntry)
//         // await writeToLogFile(errorLogEntry, errorLogFileName);
//     }
// }
// export { logError, logInfo, logWarn, createApiLogger };
//# sourceMappingURL=logger.js.map