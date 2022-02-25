import { Router } from "express";

import { CreateTopicController } from "@modules/topics/useCases/createTopic/CreateTopicController";
import { DeleteTopicController } from "@modules/topics/useCases/deleteTopic/DeleteTopicController";
import { ListAllTopicsController } from "@modules/topics/useCases/listAllTopics/ListAllTopicsController";
import { ShowTopicController } from "@modules/topics/useCases/showTopic/ShowTopicController";
import { UpdateTopicController } from "@modules/topics/useCases/updateTopic/UpdateTopicController";

const topicsRouter = Router();

const createTopicController = new CreateTopicController();
const deleteTopicController = new DeleteTopicController();
const listAllTopicsController = new ListAllTopicsController();
const showTopicController = new ShowTopicController();
const updateTopicController = new UpdateTopicController();

topicsRouter.get("/", listAllTopicsController.handle);
topicsRouter.get("/:id", showTopicController.handle);
topicsRouter.post("/", createTopicController.handle);
topicsRouter.put("/:id", updateTopicController.handle);
topicsRouter.delete("/:id", deleteTopicController.handle);

export { topicsRouter };
