import { Router } from "express";

import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { DeleteUserController } from "@modules/users/useCases/deleteUser/DeleteUserController";
import { ListAllUsersController } from "@modules/users/useCases/listAllUsers/ListAllUsersController";
import { ShowUserController } from "@modules/users/useCases/showUser/ShowUserController";
import { UpdateUserController } from "@modules/users/useCases/updateUser/UpdateUserController";

const usersRouter = Router();

const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const listAllUsersController = new ListAllUsersController();
const showUserController = new ShowUserController();
const updateUserController = new UpdateUserController();

usersRouter.post("/", createUserController.handle);
usersRouter.get("/", listAllUsersController.handle);
usersRouter.get("/:id", showUserController.handle);
usersRouter.put("/:id", updateUserController.handle);
usersRouter.delete("/:id", deleteUserController.handle);

export { usersRouter };
