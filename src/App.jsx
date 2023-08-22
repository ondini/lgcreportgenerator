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
import Navbar from "./components/Navbar";
import { NAVBAR_WIDTH_WIDE } from "./data/constants";
import { styled } from "@mui/material/styles";

import { useState, useMemo } from "react";
import { getData, get3DPointData, getFrames } from "./data_processing/processing";

const dataFile = "SUS-1895_26465_TT2-radial_calage-FTN.json";
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
      <Navbar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <MainLayoutStyle>
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
