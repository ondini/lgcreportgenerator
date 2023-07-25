import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Drawer,
  Box,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

import { SIDEBAR_WIDTH, NAVBAR_WIDTH_WIDE } from "../data/constants";
import { useTheme } from "@emotion/react";

const sidebarItems = [
  { title: "Header", url: "/" },
  { title: "3DPlot", url: "trades" },
  { title: "3DPoints", url: "sources" },
  { title: "Histogram", url: "strategies" },
  { title: "Observations", url: "staking" },
  { title: "Frames", url: "taxes" },
  { title: "Account", url: "account" },
  { title: "Support", url: "support" },
];

const ListStyled = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  justifyContent: "space-between",
});

const sidebarWideContent = (
  <ListStyled>
    <List sx={{ p: 1 }}>
      {sidebarItems.map((item, index) => (
        <NavItem key={item.title} item={item} />
      ))}
    </List>
    <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}></Box>
  </ListStyled>
);

// export const StyledNavItem = styled((props) => <ListItemButton disableGutters {...props} />)(
//   ({ theme }) => ({
//     // ...theme.typography.body1,
//     height: 50,
//     position: "relative",
//     textTransform: "capitalize",
//     // color: theme.palette.text.secondary,
//     // borderRadius: theme.shape.borderRadius,
//   })
// );

export const StyledNavItemIcon = styled(ListItemIcon)({
  width: 23,
  height: 23,
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

function NavItem({ item }) {
  const { title, url, icon, info } = item;

  return (
    <ListItemButton
      to={url}
      sx={{
        "&.active": {
          color: "primary.main",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />
    </ListItemButton>
  );
}

const Navbar = ({ mobileOpen, handleDrawerToggle }) => {
  //   const theme = useTheme();
  return (
    <Box component="nav" aria-label="nav links">
      {/* MOBILE DRAWER */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: NAVBAR_WIDTH_WIDE,
            // background: theme.palette.background.default,
          },
        }}
      >
        {sidebarWideContent}
      </Drawer>

      {/* DESKTOP DRAWER WIDE */}
      <Drawer
        variant="persistent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: NAVBAR_WIDTH_WIDE,
            height: "100vh",
            overflow: "hidden",
            borderRight: "dashed 1px",
            // borderColor: theme.palette.border.main,
            // background: theme.palette.background.default,
          },
        }}
        open
      >
        {sidebarWideContent}
      </Drawer>
    </Box>
  );
};

export default Navbar;
