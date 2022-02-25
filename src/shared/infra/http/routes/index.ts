import { Router } from "express";

import { booksRouter } from "./books.routes";
import { authorsRouter } from "./authors.routes";
import { employeesRouter } from "./employee.routes";
import { authenticateRouter } from "./authenticate.routes";
import { exemplaryRouter } from "./exemplary.routes";
import { publisherRouter } from "./publishers.routes";
import { usersRouter } from "./users.routes";
import { topicsRouter } from "./topics.routes";
import { reservationsRouter } from "./reservation.routes";
import { rentalsRouter } from "./rentals.routes";

const routes = Router();

routes.use(authenticateRouter);

routes.use("/books", booksRouter);
routes.use("/authors", authorsRouter);
routes.use("/employees", employeesRouter);
routes.use("/exemplary", exemplaryRouter);
routes.use("/publishers", publisherRouter);
routes.use("/users", usersRouter);
routes.use("/topics", topicsRouter);
routes.use("/reservations", reservationsRouter);
routes.use("/rentals", rentalsRouter);

export { routes };
