import e, { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { ListAllEmployeesController } from "@modules/employees/useCases/listAllEmployees/ListAllEmployeesController";
import { ShowEmployeeController } from "@modules/employees/useCases/showEmployee/ShowEmployeeController";
import { CreateEmployeeController } from "@modules/employees/useCases/createEmployee/CreateEmployeeController";
import { UpdateEmployeeController } from "@modules/employees/useCases/updateEmployee/UpdateEmployeeController";
import { DeleteEmployeeController } from "@modules/employees/useCases/deleteEmployee/DeleteEmployeeController";
import { TurnEmployeeAdminController } from "@modules/employees/useCases/turnEmployeeAdmin/TurnEmployeeAdminController";

const employeesRouter = Router();

const listAllEmployeesController = new ListAllEmployeesController();
const showEmployeeController = new ShowEmployeeController();
const createEmployeeController = new CreateEmployeeController();
const updateEmployeeController = new UpdateEmployeeController();
const deleteEmployeeController = new DeleteEmployeeController();
const turnEmployeeAdminController = new TurnEmployeeAdminController();

employeesRouter.use(ensureAuthenticated);

employeesRouter.get("/", listAllEmployeesController.handle);

employeesRouter.get("/:id", showEmployeeController.handle);

employeesRouter.post("/", createEmployeeController.handle);

employeesRouter.put("/:id", updateEmployeeController.handle);

employeesRouter.patch("/:id", turnEmployeeAdminController.handle);

employeesRouter.delete("/:id", deleteEmployeeController.handle);

export { employeesRouter };
