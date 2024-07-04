export interface StockData {
  [symbol: string]: StockDataItem;
}
export interface StockDataItem {
  c: string[]; // Lista de strings
  p: number; // Número para el precio
  s: string; // Cadena para el símbolo
  t: number; // Número para el tiempo (timestamp)
  v: number; // Número para el volumen
}

export const STOCKS = [
  "AAPL",
  "GOOGL",
  "MSFT",
  "TSLA",
  "BINANCE:BTCUSDT",
  "BINANCE:BNBUSDT",
  "BINANCE:DOTUSDT",
  "BINANCE:LTCUSDT",
  "BINANCE:LINKUSDT",
  "HITBTC:BTCUSD",
];
