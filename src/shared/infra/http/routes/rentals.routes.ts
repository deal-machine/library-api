import { Router } from "express";

import { ListAllRentalsController } from "@modules/rentals/useCases/listAllRentals/ListAllRentalsController";
import { ShowRentalController } from "@modules/rentals/useCases/showRental/ShowRentalController";
import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { UpdateRentalController } from "@modules/rentals/useCases/updateRental/UpdateRentalController";
import { DeleteRentalController } from "@modules/rentals/useCases/deleteRental/DeleteRentalController";

const rentalsRouter = Router();

const listAllRentalsController = new ListAllRentalsController();
const showRentalController = new ShowRentalController();
const createRentalController = new CreateRentalController();
const updateRentalController = new UpdateRentalController();
const deleteRentalController = new DeleteRentalController();

rentalsRouter.get("/", listAllRentalsController.handle);
rentalsRouter.get("/:id", showRentalController.handle);
rentalsRouter.post("/", createRentalController.handle);
rentalsRouter.put("/:id", updateRentalController.handle);
rentalsRouter.delete("/:id", deleteRentalController.handle);

export { rentalsRouter };
