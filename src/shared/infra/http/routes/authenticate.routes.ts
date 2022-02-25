import { Router } from "express";

import { AuthenticateEmployeeController } from "@modules/employees/useCases/authenticateEmployee/AuthenticateEmployeeController";

const authenticateRouter = Router();

const authenticateEmployeeController = new AuthenticateEmployeeController();

authenticateRouter.post("/auth", authenticateEmployeeController.handle);

export { authenticateRouter };
