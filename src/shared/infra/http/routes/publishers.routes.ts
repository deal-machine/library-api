import { Router } from "express";

import { CreatePublisherController } from "@modules/publishers/useCases/createPublisher/CreatePublisherController";
import { ListAllPublishersController } from "@modules/publishers/useCases/listAllPublishers/ListAllPublishersController";
import { DeletePublisherController } from "@modules/publishers/useCases/deletePublisher/DeletePublisherController";
import { ShowPublisherController } from "@modules/publishers/useCases/showPublisher/ShowPublisherController";
import { UpdatePublisherController } from "@modules/publishers/useCases/updatePublisher/UpdatePublisherController";

const publisherRouter = Router();

const createPublisherController = new CreatePublisherController();
const listAllPublishersController = new ListAllPublishersController();
const deletePublisherController = new DeletePublisherController();
const showPublisherController = new ShowPublisherController();
const updatePublisherController = new UpdatePublisherController();

publisherRouter.post("/", createPublisherController.handle);
publisherRouter.get("/", listAllPublishersController.handle);
publisherRouter.get("/:id", showPublisherController.handle);
publisherRouter.put("/:id", updatePublisherController.handle);
publisherRouter.delete("/:id", deletePublisherController.handle);

export { publisherRouter };
