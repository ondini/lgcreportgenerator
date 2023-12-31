import { useState } from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { styled } from "@mui/material/styles";
import Fade from "@mui/material/Fade";
import { linkPathPlaceholder } from "../data/constants";

const StyledTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
  () => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#fff",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 500,
      fontSize: "0.8rem",
      border: "1px solid #dadde9",
    },
  })
);

const InstrumentTooltip = ({ title, details, line = undefined }) => {
  // Tooltip for instrument data in observation table
  const [open, setOpen] = useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = (event) => {
    setOpen(true);
    if (event.ctrlKey && line) {
      window.location.href = `surveypad://link//${linkPathPlaceholder},${line}`;
    }
  };

  return (
    <div>
      {" "}
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <StyledTooltip
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            placement="right"
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 50 }}
            title={details}
          >
            <div className="tooltip" onClick={handleTooltipOpen}>
              {title}
            </div>
          </StyledTooltip>
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default InstrumentTooltip;
