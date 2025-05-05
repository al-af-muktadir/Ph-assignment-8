import catchAsync from "../../../utilities/catchAsync";
import sendResponse from "../../../utilities/sendResponse";
import { ServiceRecordService } from "./bs.service";

export class ServiceRecordController {
    static createServiceRecord = catchAsync(async (req, res) => {
        const result = await ServiceRecordService.createServiceRecord(req.body);
        sendResponse(res,true,"Service record created successfully",undefined,result)
    })

    static getAllServiceRecords = catchAsync(async (req, res) => {
        
        const result = await ServiceRecordService.getAllServiceRecords();
        sendResponse(res, true, "Service records fetched successfully", undefined, result)
    })

    static getSingleServiceRecord = catchAsync(async (req, res) => {
        const result = await ServiceRecordService.getSingleServiceRecord(req.params.id);
        sendResponse(res, true, "Service record fetched successfully", undefined, result)
    })

    static updateServiceRecord = catchAsync(async (req, res) => {
        const result = await ServiceRecordService.updateServiceRecord(req.params?.id, req.body?.completionDate)
        sendResponse(res,true,"Service marked as completed",undefined,result)
    })


    static getAllPendingServiceRecords = catchAsync(async (req, res) => {
        const result = await ServiceRecordService.getAllPendingServiceRecords()
        sendResponse(res,true,"Overdue or pending services fetched successfully",undefined,result)
    })
}