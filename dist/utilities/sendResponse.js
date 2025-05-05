"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param res Response from Express.js from the Specific Controller
 * @param statusCode HTTP Status Code
 * @param success Success Response as boolean (`true` or `false`)
 * @param message Custom Message Message
 * @param meta Optional meta data for pagination
 * @param data Optional Data to send
 */
const sendResponse = (res, 
// statusCode: number,
success, message, meta, data) => {
    if (data) {
        res
            // .status(statusCode)
            .json({
            success,
            message,
            // statusCode,
            meta,
            data,
        });
    }
    else {
        res
            // .status(statusCode)
            .json({
            success,
            message,
            // statusCode,
        });
    }
};
exports.default = sendResponse;
