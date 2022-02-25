import { TopicAttributes } from "../ITopicsRepository";

class TopicInMemory implements TopicAttributes {
  id?: number;
  description: string;

  constructor() {
    if (!this.id) this.id = Math.floor(Math.random() * 10) + 1;
  }
}

export { TopicInMemory };
