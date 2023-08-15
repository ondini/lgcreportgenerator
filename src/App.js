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

import { useState, useMemo } from "react";
import { getData, get3DPointData, getFrames } from "./data_processing/processing";

const dataFile = "2022-11-29_ ATLAS_network_YETS2022-23_TestJSON.json";
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

  const observations = useMemo(() => {
    return getData(GMData.LGC_DATA, "OBS");
  }, []);

  const points3D = useMemo(() => {
    return get3DPointData(GMData.LGC_DATA);
  }, []);

  
  const frames = useMemo(() => {
    return getFrames(GMData.LGC_DATA);
  }, []);

  return (
    <div className="app">
      <Navbar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <MainLayoutStyle>
        <Header data={GMData} fName={dataFile} />
        <Point3DTable pointsData={points3D} />
        {/* <Point3DTable2 data={GMData} /> */}
        <MeasurementsTable data={GMData} />
        <Histogram residuals={observations} />
        <ObservationsTable observations={observations} />
        <FrameTable frameData={frames} />
        <FrameTree tree={frames.tree} />
        <Plot3D pointsCoords={points3D.coords} />
      </MainLayoutStyle>
    </div>
  );
}

export default App;