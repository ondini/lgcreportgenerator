import { List, ListItemButton, ListItemText, Drawer, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import LogoSection from "../data/imgs/Logo";

import { NAVBAR_WIDTH_WIDE } from "../data/constants";

const sidebarItems = [
  { title: "Header", url: "#header" },
  { title: "3D Points Table", url: "#tablePt3D" },
  { title: "Measurement statistics", url: "#measurements" },
  { title: "Histograms", url: "#histograms" },
  { title: "Observations Table", url: "#observations" },
  { title: "Frames Table", url: "#frames" },
  { title: "Frames Tree", url: "#framesTree" },
  { title: "3D Plot", url: "#plotPt3D" },
];

const ListStyled = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  justifyContent: "flex-start",
});

const sidebarWideContent = (
  <ListStyled>
    <Box sx={{ p: 4 }}>
      <a href="#top">
        <LogoSection sx={{ p: 2, mt: 2, mr: 1 }} />
      </a>
    </Box>
    <List sx={{ p: 1 }}>
      {sidebarItems.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </List>
    <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}></Box>
  </ListStyled>
);

function NavItem({ item }) {
  const { title, url } = item;

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

const Navbar = ({ open }) => {
  return (
    <Box component="nav" aria-label="nav links">
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
        open={open}
      >
        {sidebarWideContent}
      </Drawer>
    </Box>
  );
};

export default Navbar;
