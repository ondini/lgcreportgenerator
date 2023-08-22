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
import { NAVBAR_WIDTH_WIDE, drawerWidth } from "./data/constants";
import { styled } from "@mui/material/styles";

import { useState, useMemo } from "react";
import { getData, get3DPointData, getFrames } from "./data_processing/processing";

const dataFile = "21517v2_mx_TSTN.json";
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
    console.log("handleDrawerToggle", open);
    setOpen(!open);
  };

  const points3D = useMemo(() => {
    return get3DPointData(GMData.LGC_DATA);
  }, []);

  const observations = useMemo(() => {
    return getData(GMData.LGC_DATA, "OBS", points3D.lookup);
  }, [points3D.lookup]);

  const frames = useMemo(() => {
    return getFrames(GMData.LGC_DATA);
  }, []);

  const unknownPars = useMemo(() => {
    let uknonwnAngles = 0;
    GMData.LGC_DATA.angles.forEach((angle) => (uknonwnAngles += angle.isFixed ? 0 : 1));

    let uknonwnDists = 0;
    GMData.LGC_DATA.lengths.forEach((dist) => (uknonwnDists += dist.isFixed ? 0 : 1));

    let uknownPlanes = 0;
    GMData.LGC_DATA.planes.forEach((plane) => {
      uknownPlanes += plane.fPhiFixed ? 0 : 1;
      uknownPlanes += plane.fRefPtDistFixed ? 0 : 1;
      uknownPlanes += plane.fThetaFixed ? 0 : 1;
      plane.fReferencePoint.fixedState.forEach((curr) => (uknownPlanes += curr ? 0 : 1));
    });

    return {
      p3D: points3D.unknownPars,
      frames: frames.unknownPars,
      angles: uknonwnAngles,
      dists: uknonwnDists,
      planes: uknownPlanes,
    };
  }, [points3D, frames]);

  console.log(observations);

  return (
    <div className="app">
      <Navbar open={open} handleDrawerToggle={handleDrawerToggle} />
      <MainLayoutStyle open={open}>
        <NavbarToggle open={open} handleClick={handleDrawerToggle} />
        <Header data={GMData} unknownPars={unknownPars} />
        <Point3DTable pointsData={points3D} />
        <MeasurementsTable data={GMData} lookupTab3D={points3D.lookup} />
        <Histogram residuals={observations} />
        <ObservationsTable observations={observations} />
        <FrameTable frameData={frames} />
        <FrameTree tree={frames.tree} numNodes={frames.data.length} />
        <Plot3D pointsCoords={points3D.coords} />
      </MainLayoutStyle>
    </div>
  );
}

export default App;
