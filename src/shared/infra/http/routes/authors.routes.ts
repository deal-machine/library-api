import { Router } from "express";

import { CreateAuthorController } from "@modules/authors/useCases/createAuthor/CreateAuthorController";
import { DeleteAuthorController } from "@modules/authors/useCases/deleteAuthor/DeleteAuthorController";
import { ListAllAuthorsController } from "@modules/authors/useCases/listAllAuthors/ListAllAuthorsController";
import { ShowAuthorController } from "@modules/authors/useCases/showAuthor/ShowAuthorController";
import { UpdateAuthorController } from "@modules/authors/useCases/updateAuthor/UpdateAuthorController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const authorsRouter = Router();

const listAuthorsController = new ListAllAuthorsController();
const showAuthorController = new ShowAuthorController();
const createAuthorController = new CreateAuthorController();
const updateAuthorController = new UpdateAuthorController();
const deleteAuthorController = new DeleteAuthorController();

authorsRouter.use(ensureAuthenticated);

authorsRouter.get("/", listAuthorsController.handle);

authorsRouter.get("/:id", showAuthorController.handle);

authorsRouter.post("/", createAuthorController.handle);

authorsRouter.put("/:id", updateAuthorController.handle);

authorsRouter.delete("/:id", deleteAuthorController.handle);

export { authorsRouter };
