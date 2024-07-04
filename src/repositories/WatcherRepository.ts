import { StockData } from "../types/stock/StockData";

export interface WatcherRepository {
  getConnection(): WebSocket;
  getAllStocks(): Promise<StockData>;
  sendNotification(): void;
}
