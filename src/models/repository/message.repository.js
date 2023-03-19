import { messageInstance } from "../dao/index.dao.js";
import MessageDTO from "../dto/message.dto.js";

export default class MessageRepository {
  constructor() {
    this.dao = messageInstance;
  }

  async readFile() {
    const data = await this.dao.readJSONFile();
    const dataDTO = data[0].messages.map((m) => {
      return new MessageDTO(m.authors.email, m.comments.content, m.comments.timestamp);
    });
    return dataDTO;
  }

  async writeFile(data) {
    this.dao.addMessage(data);
    return new MessageDTO(data);
  }
}
