import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { MAIN_COLOR } from "../data/constants";

import { NAVBAR_WIDTH_WIDE } from "../data/constants";

const NavbarToggle = ({ open, handleClick }) => {
  // toggle fixed floating button for the navbar
  const style = {
    position: "fixed",
    top: "5px",
    width: "50px",
    height: "50px",
    backgroundColor: MAIN_COLOR,
    zIndex: "1000",
    borderRaadius: "20px",
    left: "5px",
    ...(open && {
      marginLeft: NAVBAR_WIDTH_WIDE + 5,
    }),
  };

  return (
    <IconButton style={style} onClick={handleClick}>
      <MenuIcon sx={{ color: "white" }} />
    </IconButton>
  );
};

export default NavbarToggle;
