import React, { useEffect } from "react";
import { Box, Typography, styled } from "@mui/material";
import { BodyText } from "../atoms";
import { StockDataItem } from "../../types/stock/StockData";

interface StockCardProps {
  stock: string;
  data: StockDataItem;
  priceAlert?: number;
  onSendNotification: () => void;
}

const CardContainer = styled(Box)({
  border: "1px solid black",
  marginBo: 2,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "1em 0",
  borderRadius: 5,
});

const StockCard: React.FC<StockCardProps> = ({
  stock,
  data,
  priceAlert,
  onSendNotification,
}) => {
  useEffect(() => {
    const alertValidated =
      priceAlert !== undefined && data.p !== undefined && data.p < priceAlert;
    if (
      "serviceWorker" in navigator &&
      "PushManager" in window &&
      alertValidated
    ) {
      onSendNotification();
    }
  }, [priceAlert]);

  return (
    <CardContainer>
      <BodyText fontFamily="Montserrat-Bold" label={stock} />
      <BodyText
        fontFamily="Montserrat-Regular"
        label={`Last Price: ${data.p !== undefined ? data.p.toFixed(2) : "-"}`}
      />

      {priceAlert !== undefined && data.p !== undefined && (
        <Typography
          style={{
            color: data.p < priceAlert ? "red" : "green",
          }}
        >
          {data.p < priceAlert ? "Below Alert" : "Above Alert"}
        </Typography>
      )}
    </CardContainer>
  );
};

export default StockCard;
