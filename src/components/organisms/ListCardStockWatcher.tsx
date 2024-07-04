import React from "react";
import { Grid } from "@mui/material";
import StockCard from "./CardStockWatcher";
import { StockData } from "../../types/stock/StockData";

const ListCardStockWatcher: React.FC<{
  stockData: StockData;
  filteredStocks: string[];
  priceAlert?: number;
  onSendNotification: () => void;
}> = ({ stockData, filteredStocks, priceAlert, onSendNotification }) => {
  return (
    <Grid container spacing={2}>
      {Object.keys(stockData)
        .filter((stock) => filteredStocks.includes(stock))
        .map((stock) => (
          <Grid item xs={12} sm={12} md={4} lg={3} xl={2} key={stock}>
            <StockCard
              stock={stock}
              data={stockData[stock]}
              priceAlert={priceAlert}
              onSendNotification={onSendNotification}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default ListCardStockWatcher;
