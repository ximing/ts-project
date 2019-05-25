import { MongoClient, Db } from "mongodb";
import { getMongoDb, getEnvironment } from "./config";

class Mongodb {
  createLoggerIndex() {}
  createFeIndex() {}

  getClient(url) {
    return MongoClient.connect(url, {
      useNewUrlParser: true
    });
  }
  async init() {
    const [mongoDB] = await Promise.all([this.getClient(getMongoDb())]);
    return {
      mongoDB: mongoDB.db("mlDB") as Db
    };
  }
}
export default new Mongodb();
