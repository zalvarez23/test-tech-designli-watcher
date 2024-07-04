import { WatcherRepository } from "../../repositories/WatcherRepository";
import { ApiWatcher } from "../../repositories/WatcherRepositoryImpl";

export class WatcherServices implements WatcherRepository {
  private apiWatcher: ApiWatcher;
  constructor() {
    this.apiWatcher = new ApiWatcher();
  }

  getConnection(): WebSocket {
    return this.apiWatcher.getConnection();
  }

  async getAllStocks() {
    return this.apiWatcher.getAllStocks();
  }

  sendNotification(): void {
    return this.apiWatcher.sendNotification();
  }
}
