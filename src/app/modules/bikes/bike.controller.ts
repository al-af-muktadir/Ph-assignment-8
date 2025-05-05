import catchAsync from "../../../utilities/catchAsync";
import sendResponse from "../../../utilities/sendResponse";
import { BikeService } from "./bike.service";

export class BikeController {
    static createBike = catchAsync(async (req, res) => {
        const result = await BikeService.createBike(req.body);
        sendResponse(res,true,"Bike added successfully",undefined,result)
    })
    

    static getAllBikes = catchAsync(async (req, res) => {
        const result = await BikeService.getAllBikes();
        sendResponse(res,true,"Bikes fetched successfully",undefined,result)
    })

    static getSingleBike = catchAsync(async (req, res) => {
        const result = await BikeService.getSingleBike(req.params.id);
        sendResponse(res,true,"Bike fetched successfully",undefined,result)
    })
}