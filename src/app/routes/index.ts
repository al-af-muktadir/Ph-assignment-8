import { Router } from "express";
import CustomerRoute from "../modules/customers/customer.route";
import BikeRoute from "../modules/bikes/bike.route";
import ServiceRecordRoute from "../modules/bikeServices/bs.route";

const router: Router = Router();



const allRoutes = [
    {
        path: "/customers",
        route: CustomerRoute
  },
  {
    path: "/bikes",
    route: BikeRoute
  },
  {
    path: "/services",
    route: ServiceRecordRoute
  }
];

allRoutes.forEach((singleRoute) =>
  router.use(singleRoute.path!, singleRoute.route!)
);

export default router;
