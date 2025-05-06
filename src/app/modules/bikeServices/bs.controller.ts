import catchAsync from "../../../utilities/catchAsync";
import sendResponse from "../../../utilities/sendResponse";
import { ServiceRecordService } from "./bs.service";

const createServiceRecord = catchAsync(async (req, res) => {
  const result = await ServiceRecordService.createServiceRecord(req.body);
  sendResponse(
    res,
    true,
    "Service record created successfully",
    undefined,
    result
  );
});

const getAllServiceRecords = catchAsync(async (req, res) => {
  const result = await ServiceRecordService.getAllServiceRecords();
  sendResponse(
    res,
    true,
    "Service records fetched successfully",
    undefined,
    result
  );
});

const getSingleServiceRecord = catchAsync(async (req, res) => {
  const result = await ServiceRecordService.getSingleServiceRecord(
    req.params.id
  );
  sendResponse(
    res,
    true,
    "Service record fetched successfully",
    undefined,
    result
  );
});

const updateServiceRecord = catchAsync(async (req, res) => {
  const result = await ServiceRecordService.updateServiceRecord(
    req.params?.id,
    req.body?.completionDate
  );
  sendResponse(res, true, "Service marked as completed", undefined, result);
});

const getAllPendingServiceRecords = catchAsync(async (req, res) => {
  const result = await ServiceRecordService.getAllPendingServiceRecords();
  sendResponse(
    res,
    true,
    "Overdue or pending services fetched successfully",
    undefined,
    result
  );
});
export const ServiceRecordController = {
  getAllPendingServiceRecords,
  updateServiceRecord,
  getSingleServiceRecord,
  getAllServiceRecords,
  createServiceRecord,
};
