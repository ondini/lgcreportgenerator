import { getData, get3DPointData, getFrames, getMeasData } from "./processing";

function getAllData(GMData) {
  /** function that returns all the data needed for the report and putting them into a single object  */
  const points3D = get3DPointData(GMData.LGC_DATA);
  const observations = getData(GMData.LGC_DATA, points3D.lookup);
  const frames = getFrames(GMData.LGC_DATA);

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

  const unknownPars = {
    p3D: points3D.unknownPars,
    frames: frames.unknownPars,
    angles: uknonwnAngles,
    dists: uknonwnDists,
    planes: uknownPlanes,
  };

  const measStats = getMeasData(GMData.LGC_DATA, points3D.lookup);

  return { points3D, observations, frames, unknownPars, measStats };
}

export default getAllData;
