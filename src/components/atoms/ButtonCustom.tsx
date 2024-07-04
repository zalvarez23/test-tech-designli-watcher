import { Button, CircularProgress } from "@mui/material";
import React from "react";

type UpdateButtonProps = {
  isLoading: boolean;
  onUpdate?: () => void;
  label: string;
};
const ButtonCustom: React.FC<UpdateButtonProps> = ({
  isLoading,
  onUpdate,
  label,
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => typeof onUpdate === "function" && onUpdate()}
      style={{ fontSize: 11 }}
    >
      {isLoading ? (
        <>
          <CircularProgress size={20} color="inherit" />
          &nbsp;&nbsp;&nbsp;Procesando . .
        </>
      ) : (
        label
      )}
    </Button>
  );
};

export default ButtonCustom;
