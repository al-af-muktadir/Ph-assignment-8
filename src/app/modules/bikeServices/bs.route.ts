import { ServiceRecordController } from './bs.controller';
import { Router } from "express";

const ServiceRecordRoute: Router = Router();


ServiceRecordRoute.post('/', ServiceRecordController.createServiceRecord)
ServiceRecordRoute.get('/', ServiceRecordController.getAllServiceRecords)
ServiceRecordRoute.get(
  "/status",
  ServiceRecordController.getAllPendingServiceRecords
);

ServiceRecordRoute.put('/:id/complete', ServiceRecordController.updateServiceRecord)
ServiceRecordRoute.get("/:id", ServiceRecordController.getSingleServiceRecord);

export default ServiceRecordRoute;