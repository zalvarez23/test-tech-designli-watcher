import { STOCKS, StockData } from "../types/stock/StockData";
import { WatcherRepository } from "./WatcherRepository";
import { DefaultApi } from "finnhub-ts";

export class ApiWatcher implements WatcherRepository {
  private apiUrl: string;
  private apiKey: string;
  constructor() {
    this.apiUrl = import.meta.env.VITE_API_URL as string;
    this.apiKey = import.meta.env.VITE_API_KEY as string;
  }
  getConnection(): WebSocket {
    const socket = new WebSocket(`${this.apiUrl}?token=${this.apiKey}`);
    return socket;
  }

  private transformQuoteData = (symbol: string, quote: any) => {
    return {
      p: quote.c,
      s: symbol,
      t: quote.t,
      v: quote.v ?? 0, // Si no hay un volumen disponible, asignar 0 u otro valor por defecto
    };
  };
  async getAllStocks(): Promise<StockData> {
    const apiClient = new DefaultApi({
      apiKey: this.apiKey,
      isJsonMime: (input: any) => {
        try {
          JSON.parse(input);
          return true;
        } catch (error) {}
        return false;
      },
    });
    const promises = STOCKS.map((stock) => apiClient.quote(stock));
    const quotes = await Promise.all(promises);
    const newStockData = quotes.reduce((acc: any, quote, index) => {
      const transformedData = this.transformQuoteData(
        STOCKS[index],
        quote.data
      );
      acc[STOCKS[index]] = transformedData;
      return acc;
    }, {} as StockData);

    return newStockData;
  }

  sendNotification(): void {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("¡Alert Price Stock!", {
          body: "Existen precios por debajo del Price Alert !!",
          icon: "./prezzo_icon_512x512.png",
        });
      });
    }
  }
}
