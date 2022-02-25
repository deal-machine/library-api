import { PublisherAttributes } from "../IPublishersRepository";

class PublisherInMemory implements PublisherAttributes {
  id?: number;
  description: string;

  constructor() {
    if (!this.id) this.id = Math.floor(Math.random() * 10) + 1;
  }
}

export { PublisherInMemory };
