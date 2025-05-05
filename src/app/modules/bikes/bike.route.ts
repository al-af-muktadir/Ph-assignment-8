import { Router } from "express";
import { BikeController } from "./bike.controller";

const BikeRoute: Router = Router();

BikeRoute.post('/', BikeController.createBike)
BikeRoute.get('/',BikeController.getAllBikes)
BikeRoute.get("/:id",BikeController.getSingleBike)



export default BikeRoute;