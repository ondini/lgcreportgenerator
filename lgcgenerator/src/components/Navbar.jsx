import { List, ListItemButton, ListItemText, Drawer, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import { NAVBAR_WIDTH_WIDE } from "../data/constants";

const sidebarItems = [
  { title: "Header", url: "#header" },
  { title: "3DPlot", url: "#plotPt3D" },
  { title: "Histograms", url: "#histograms" },
  { title: "3D Points Tab.", url: "#tablePt3D" },
  { title: "Observations Tab.", url: "#observations" },
  { title: "Frames Tab.", url: "#frames" },
  { title: "Frames Tree", url: "#framesTree" },
];

const ListStyled = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  padding: "1rem 2rem",
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
      <ListItemText disableTypography primary={title} />
    </ListItemButton>
  );
}

const Navbar = ({ mobileOpen, handleDrawerToggle }) => {
  return (
    <Box component="nav" aria-label="nav links">
      {/* MOBILE DRAWER */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: NAVBAR_WIDTH_WIDE,
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
            borderRight: "solid 1px",
            borderColor: "#e0e0e0",
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
