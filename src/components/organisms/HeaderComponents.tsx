import { Box, Divider, IconButton, Typography } from "@mui/material";
import React from "react";
import { CustomColors } from "../../constants/Colors";
import { ArrowRightAltRounded, AddCircleOutline } from "@mui/icons-material";
import { HeaderLeftSegments, HeaderRightText } from "../molecules";

type HeaderComponentProps = {
  labelsLeft?: string[];
  labelsRight?: string[];
  titleName?: string;
};
const HeaderComponent: React.FC<HeaderComponentProps> = ({
  labelsLeft = [],
  labelsRight = [],
  titleName,
}) => {
  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
      >
        <HeaderLeftSegments labels={labelsLeft} borderBottom={true} />
        <HeaderRightText labels={labelsRight} />
      </Box>
      <Box paddingY={1}>
        <Divider />
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <ArrowRightAltRounded />
        <Typography
          fontFamily={"Montserrat-Bold"}
          fontWeight={600}
          color={CustomColors.black}
        >
          {titleName}
        </Typography>
        <IconButton>
          <AddCircleOutline />
        </IconButton>
      </Box>
    </Box>
  );
};

HeaderComponent.defaultProps = {
  labelsLeft: ["Show All"],
  labelsRight: ["Filter", "Sort"],
  titleName: "Real-Time Stock Data",
};
export default HeaderComponent;
