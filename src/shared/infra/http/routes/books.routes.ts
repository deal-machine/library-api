import { Router } from "express";

import { CreateBookController } from "@modules/books/useCases/createBook/CreateBookController";
import { ListAllBooksController } from "@modules/books/useCases/listAllBooks/ListAllBooksController";
import { ShowBookController } from "@modules/books/useCases/showBook/ShowBookController";
import { DeleteBookController } from "@modules/books/useCases/deleteBook/DeleteBookController";
import { UpdateBookController } from "@modules/books/useCases/updateBook/UpdateBookController";
import { SetTopicInBookController } from "@modules/books/useCases/setTopic/SetTopicInBookController";

const booksRouter = Router();

const createBookController = new CreateBookController();
const listAllBooksController = new ListAllBooksController();
const showBookController = new ShowBookController();
const deleteBookController = new DeleteBookController();
const updateBookController = new UpdateBookController();

const setTopicInBookController = new SetTopicInBookController();

booksRouter.get("/", listAllBooksController.handle);
booksRouter.get("/:id", showBookController.handle);
booksRouter.post("/", createBookController.handle);
booksRouter.put("/:id", updateBookController.handle);
booksRouter.delete("/:id", deleteBookController.handle);

booksRouter.post("/:id/topics", setTopicInBookController.handle);

export { booksRouter };
