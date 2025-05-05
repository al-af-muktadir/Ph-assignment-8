"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_route_1 = __importDefault(require("../modules/customers/customer.route"));
const bike_route_1 = __importDefault(require("../modules/bikes/bike.route"));
const bs_route_1 = __importDefault(require("../modules/bikeServices/bs.route"));
const router = (0, express_1.Router)();
const allRoutes = [
    {
        path: "/customers",
        route: customer_route_1.default
    },
    {
        path: "/bikes",
        route: bike_route_1.default
    },
    {
        path: "/services",
        route: bs_route_1.default
    }
];
allRoutes.forEach((singleRoute) => router.use(singleRoute.path, singleRoute.route));
exports.default = router;
