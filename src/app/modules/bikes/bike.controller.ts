import catchAsync from "../../../utilities/catchAsync";
import sendResponse from "../../../utilities/sendResponse";
import { BikeService } from "./bike.service";

const createBike = catchAsync(async (req, res) => {
  const result = await BikeService.createBike(req.body);
  sendResponse(res, true, "Bike added successfully", undefined, result);
});

const getAllBikes = catchAsync(async (req, res) => {
  const result = await BikeService.getAllBikes();
  sendResponse(res, true, "Bikes fetched successfully", undefined, result);
});

const getSingleBike = catchAsync(async (req, res) => {
  const result = await BikeService.getSingleBike(req.params.id);
  sendResponse(res, true, "Bike fetched successfully", undefined, result);
});

export const BikeController = {
  createBike,
  getAllBikes,
  getSingleBike,
};
