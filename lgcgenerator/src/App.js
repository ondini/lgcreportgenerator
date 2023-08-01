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

const dataFile = "SUS-1895_26465_TT2-radial_calage-FTN.json"; 
//const dataFile = "Placeholder.json";
const GMData = require(`./json_tmp/${dataFile}`);

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
        <FrameTree data={GMData}/>
      </MainLayoutStyle>
    </div>
  );
}

export default App;
