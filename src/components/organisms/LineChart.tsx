import React from "react";
import { Box, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { StockData } from "../../types/stock/StockData";

interface LineChartProps {
  stockData: StockData;
  filteredStocks: string[];
}

const LineChartWatcher: React.FC<LineChartProps> = ({
  stockData,
  filteredStocks,
}) => {
  return (
    <Box mt={4}>
      <Typography variant="h5">Stock Value Chart</Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={Object.values(stockData)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="t" />
          <YAxis />
          <Tooltip />
          <Legend />
          {filteredStocks.map((stock) => (
            <Line
              key={stock}
              type="monotone"
              dataKey="p"
              data={Object.values(stockData).filter((data) => data.s === stock)}
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name={stock}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default LineChartWatcher;
