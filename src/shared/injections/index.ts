import { container } from "tsyringe";

import { IAuthorsRepository } from "@modules/authors/repositories/IAuthorsRepository";
import { AuthorsRepository } from "@modules/authors/repositories/implementations/AuthorsRepository";
import { IEmployeesRepository } from "@modules/employees/repositories/IEmployeesRepository";
import { EmployeesRepository } from "@modules/employees/repositories/implementations/EmployeesRepository";
import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";
import { BooksRepository } from "@modules/books/repositories/implementations/BooksRepository";
import { IExemplaryRepository } from "@modules/exemplary/repositories/IExemplaryRepository";
import { ExemplaryRepository } from "@modules/exemplary/repositories/implementations/ExemplaryRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { RentalsRepository } from "@modules/rentals/repositories/implementations/RentalsRepository";
import { IReservationsRepository } from "@modules/reservations/repositories/IReservationsRepository";
import { ReservationsRepository } from "@modules/reservations/repositories/implementations/ReservationsRepository";
import { UsersRepository } from "@modules/users/repositories/implementations/UsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IPublishersRepository } from "@modules/publishers/repositories/IPublishersRepository";
import { PublishersRepository } from "@modules/publishers/repositories/implementations/PublishersRepository";
import { ITopicsRepository } from "@modules/topics/repositories/ITopicsRepository";
import { TopicsRepository } from "@modules/topics/repositories/implementations/TopicsRepository";

container.registerSingleton<IAuthorsRepository>(
  "AuthorsRepository",
  AuthorsRepository
);

container.registerSingleton<IEmployeesRepository>(
  "EmployeesRepository",
  EmployeesRepository
);

container.registerSingleton<IBooksRepository>(
  "BooksRepository",
  BooksRepository
);

container.registerSingleton<IExemplaryRepository>(
  "ExemplaryRepository",
  ExemplaryRepository
);

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
);

container.registerSingleton<IReservationsRepository>(
  "ReservationsRepository",
  ReservationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IPublishersRepository>(
  "PublishersRepository",
  PublishersRepository
);

container.registerSingleton<ITopicsRepository>(
  "TopicsRepository",
  TopicsRepository
);
