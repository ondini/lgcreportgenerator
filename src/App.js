import "./App.css";
import {
  Header,
  Plot3D,
  Histogram,
  Point3DTable,
  ObservationsTable,
  MeasurementsTable,
  FrameTable,
  FrameTree,
  Point3DTable2,
  
} from "./sections";
import Navbar from "./components/Navbar";
import { NAVBAR_WIDTH_WIDE } from "./data/constants";
import { styled } from "@mui/material/styles";

import { useState } from "react";
import { getData } from "./data_processing/processing";


const dataFile ="21517v2_mx_TSTN.json"; // "LB_calcul_3D_CCS_IP_8_HLS_4_BF.json";
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

  const observations = getData(GMData.LGC_DATA, "OBS");

  return (
    <div className="app">
      <Navbar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <MainLayoutStyle>
        <Header data={GMData} fName={dataFile} />
        <Point3DTable data={GMData} />
        {/* <Point3DTable2 data={GMData} /> */}
        <MeasurementsTable data={GMData} />
        <Histogram residuals={observations} />
        <ObservationsTable observations={observations} />
        <FrameTable data={GMData} />
        <FrameTree data={GMData} />
        <Plot3D data={GMData} /> 
      </MainLayoutStyle>
    </div>
  );
}

export default App;
