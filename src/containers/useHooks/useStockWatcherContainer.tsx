import { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { STOCKS, StockData } from "../../types/stock/StockData";
import { WatcherServices } from "../../services/stockWatcher/WatcherServices";

const useStockWatcherContainer = () => {
  const [stockData, setStockData] = useState<StockData>({});
  const [socketConnected, setSocketConnected] = useState(false);

  const [selectedStock, setSelectedStock] = useState<string>("ALL");
  const [priceAlert, setPriceAlert] = useState<number | undefined>(100);

  const watcherService = new WatcherServices();

  const handleStockChange = (event: SelectChangeEvent<string>) => {
    setSelectedStock(event.target.value as string);
  };

  const handleAlertChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceAlert(parseFloat(event.target.value));
  };

  const filteredStocks = selectedStock === "ALL" ? STOCKS : [selectedStock];

  // const getDataStock = async () => {
  //   const result = await watcherService.getAllStocks();
  //   setStockData(result);
  // };

  useEffect(() => {
    // getDataStock(); // Agregé esta función para obtener los datos de las acciones por medio de fetch http si el socket falla !

    const socket = watcherService.getConnection();

    socket.onopen = () => {
      setSocketConnected(true);
      console.log("WebSocket connected");
      STOCKS.forEach((stock) => {
        socket.send(JSON.stringify({ type: "subscribe", symbol: stock }));
      });
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      // getDataStock(); // Agregé esta función para obtener los datos de las acciones por medio de fetch http si el socket falla !
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "trade") {
        setStockData((prevData) => ({
          ...prevData,
          [data.data[0].s]: data.data[0],
        }));
      }
    };

    socket.onclose = (event) => {
      console.log(event);
      // console.log(`WebSocket closed: ${event.reason}`);
      // console.log("WebSocket close code:", event.code);
      // console.log("WebSocket readyState:", socket.readyState);
      // console.log("WebSocket bufferedAmount:", socket.bufferedAmount);
      setSocketConnected(false);
    };

    // Activar notificaciones
    Notification.requestPermission().then((permission) =>
      console.log(permission)
    );
  }, []);

  const sendNotification = () => {
    watcherService.sendNotification();
  };

  return {
    stockData,
    socketConnected,
    selectedStock,
    setSelectedStock,
    priceAlert,
    setPriceAlert,
    handleStockChange,
    handleAlertChange,
    filteredStocks,
    sendNotification,
  };
};

export default useStockWatcherContainer;
