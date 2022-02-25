import { Router } from "express";

import { CreateExemplaryController } from "@modules/exemplary/useCases/createExemplary/CreateExemplaryController";
import { ListAllExemplaryController } from "@modules/exemplary/useCases/listAllExemplary/ListAllExemplaryController";
import { ShowExemplaryController } from "@modules/exemplary/useCases/showExemplary/ShowExemplaryController";
import { UpdateExemplaryController } from "@modules/exemplary/useCases/updateExemplary/UpdateExemplaryController";
import { DeleteExemplaryController } from "@modules/exemplary/useCases/deleteExemplary/DeleteExemplaryController";

const exemplaryRouter = Router();

const createExemplaryController = new CreateExemplaryController();
const listAllExemplaryController = new ListAllExemplaryController();
const showAllExemplaryController = new ShowExemplaryController();
const updateExemplaryController = new UpdateExemplaryController();
const deleteExemplaryController = new DeleteExemplaryController();

exemplaryRouter.post("/", createExemplaryController.handle);
exemplaryRouter.get("/", listAllExemplaryController.handle);
exemplaryRouter.get("/:id", showAllExemplaryController.handle);
exemplaryRouter.put("/:id", updateExemplaryController.handle);
exemplaryRouter.delete("/:id", deleteExemplaryController.handle);

export { exemplaryRouter };
