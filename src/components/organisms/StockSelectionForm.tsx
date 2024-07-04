import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

interface StockSelectionFormProps {
  selectedStock: string;
  handleStockChange: (event: SelectChangeEvent<string>) => void;
  handleAlertChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  stocks: string[];
  priceAlert?: number | undefined;
}

const StockSelectionForm: React.FC<StockSelectionFormProps> = ({
  selectedStock,
  handleStockChange,
  handleAlertChange,
  stocks,
  priceAlert,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="start"
      marginTop={3}
      alignItems="center"
    >
      <FormControl style={{ minWidth: 200 }}>
        <InputLabel>Select Stock:</InputLabel>
        <Select value={selectedStock} onChange={handleStockChange}>
          <MenuItem value="ALL">ALL</MenuItem>
          {stocks.map((stock) => (
            <MenuItem key={stock} value={stock}>
              {stock}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        type="number"
        label="Price Alert"
        value={priceAlert || ""}
        onChange={handleAlertChange}
        style={{ marginLeft: 20, minWidth: 120 }}
      />
    </Box>
  );
};

export default StockSelectionForm;
