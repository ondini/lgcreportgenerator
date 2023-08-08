import "./App.css";
import {
  Header,
  Plot3D,
  Histogram,
  Point3DTable,
  ObservationsTable,
  StationsTable,
  FrameTable,
  FrameTree,
} from "./sections";
import Navbar from "./components/Navbar";
import { NAVBAR_WIDTH_WIDE } from "./data/constants";
import { styled } from "@mui/material/styles";

import { useState } from "react";

const dataFile = "LB_calcul_3D_CCS_IP_8_HLS_4_BF.json"; // "LB_calcul_3D_CCS_IP_8_HLS_4_BF.json";
//const dataFile = "LB_calcul_3D_CCS_IP_8_HLS_4_BF.json";
const GMData = require(`./jsons_tmp/${dataFile}`);

const MainLayoutStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    marginLeft: NAVBAR_WIDTH_WIDE,
  },
}));

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="app">
      <Navbar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <MainLayoutStyle>
        <Header data={GMData} fName={dataFile} />
        <Plot3D data={GMData} />
        <Histogram data={GMData} />
        <StationsTable data={GMData} />
        <Point3DTable data={GMData} />
        <ObservationsTable data={GMData} />
        <FrameTable data={GMData} />
        <FrameTree data={GMData} />
      </MainLayoutStyle>
    </div>
  );
}

export default App;
