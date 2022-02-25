import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";
import { ITopicsRepository } from "@modules/topics/repositories/ITopicsRepository";
import { Topic } from "@database/models";

import { AppError } from "@shared/errors/AppError";

@injectable()
class SetTopicInBookUseCase {
  constructor(
    @inject("BooksRepository")
    private booksRepository: IBooksRepository,
    @inject("TopicsRepository")
    private topicsRepository: ITopicsRepository
  ) {}

  async execute(bookId: number, topicIds: []): Promise<void> {
    const book = await this.booksRepository.findById(bookId);
    if (!book) throw new AppError("Book not found.", 404);

    const topics = await this.topicsRepository.findManyIds(topicIds);
    console.log(topics);
    if (!topics || topics.length < 1)
      throw new AppError("Topic not found.", 404);

    topics.map((topic: Topic) => {
      book.addTopic(topic);
    });

    return book;
  }
}

export { SetTopicInBookUseCase };
