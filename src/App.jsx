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
} from "./sections";
import { Navbar, NavbarToggle } from "./components";
import { NAVBAR_WIDTH_WIDE } from "./data/constants";
import { styled } from "@mui/material/styles";

import { useState, useMemo } from "react";

import getAllData from "./data_processing/getAllData";

const dataFile = "26391 (11).json";
const GMData = require(`./jsons_tmp/${dataFile}`);

const MainLayoutStyle = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  flexGrow: 1,
  marginLeft: 0,
  ...(open && {
    marginLeft: NAVBAR_WIDTH_WIDE,
  }),
}));

function App() {
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  let reportData = useMemo(() => {
    return getAllData(GMData);
  }, []);

  return (
    <div className="app">
      <Navbar open={open} />
      <NavbarToggle open={open} handleClick={handleDrawerToggle} />
      <MainLayoutStyle open={open}>
        <Header data={GMData} unknownPars={reportData.unknownPars} />
        <Point3DTable pointsData={reportData.points3D} />
        <MeasurementsTable measStats={reportData.measStats} />
        <Histogram residuals={reportData.observations} />
        <ObservationsTable observations={reportData.observations} />
        <FrameTable frameData={reportData.frames} />
        <FrameTree tree={reportData.frames.tree} numNodes={reportData.frames.data.length} />
        <Plot3D pointsCoords={reportData.points3D.coords} />
      </MainLayoutStyle>
    </div>
  );
}

export default App;
