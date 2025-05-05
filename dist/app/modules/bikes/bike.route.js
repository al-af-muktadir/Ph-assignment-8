"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bike_controller_1 = require("./bike.controller");
const BikeRoute = (0, express_1.Router)();
BikeRoute.post('/', bike_controller_1.BikeController.createBike);
BikeRoute.get('/', bike_controller_1.BikeController.getAllBikes);
BikeRoute.get("/:id", bike_controller_1.BikeController.getSingleBike);
exports.default = BikeRoute;
