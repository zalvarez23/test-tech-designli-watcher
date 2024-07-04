import React from "react";
import { Container } from "@mui/material";
import useStockWatcherContainer from "./useHooks/useStockWatcherContainer";
import HeaderComponent from "../components/organisms/HeaderComponents";
import ListCardStockWatcher from "../components/organisms/ListCardStockWatcher";
import StockSelectionForm from "../components/organisms/StockSelectionForm";
import LineChartWatcher from "../components/organisms/LineChart";
import { STOCKS } from "../types/stock/StockData";

const StockWatcherContainer: React.FC = () => {
  const {
    stockData,
    selectedStock,
    priceAlert,
    handleStockChange,
    handleAlertChange,
    filteredStocks,
    sendNotification,
  } = useStockWatcherContainer();

  return (
    <Container maxWidth="lg">
      <HeaderComponent />
      <ListCardStockWatcher
        stockData={stockData}
        filteredStocks={filteredStocks}
        priceAlert={priceAlert}
        onSendNotification={sendNotification}
      />
      <StockSelectionForm
        selectedStock={selectedStock}
        handleStockChange={handleStockChange}
        handleAlertChange={handleAlertChange}
        priceAlert={priceAlert}
        stocks={STOCKS}
      />
      <LineChartWatcher stockData={stockData} filteredStocks={filteredStocks} />
    </Container>
  );
};

export default StockWatcherContainer;
