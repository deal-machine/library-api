import { Router } from "express";

import { ListAllReservationsController } from "@modules/reservations/useCases/listAllReservations/ListAllReservationsController";
import { CreateReservationController } from "@modules/reservations/useCases/createReservation/CreateReservationController";
import { ShowReservationController } from "@modules/reservations/useCases/showReservation/ShowReservationController";
import { DeleteReservationController } from "@modules/reservations/useCases/deleteReservation/DeleteReservationController";
import { UpdateReservationController } from "@modules/reservations/useCases/updateReservation/UpdateReservationController";

const reservationsRouter = Router();

const listAllReservationsController = new ListAllReservationsController();
const createReservationController = new CreateReservationController();
const showReservationController = new ShowReservationController();
const deleteReservationController = new DeleteReservationController();
const updateReservationController = new UpdateReservationController();

reservationsRouter.get("/", listAllReservationsController.handle);
reservationsRouter.get("/:id", showReservationController.handle);
reservationsRouter.post("/", createReservationController.handle);
reservationsRouter.put("/:id", updateReservationController.handle);
reservationsRouter.delete("/:id", deleteReservationController.handle);

export { reservationsRouter };
