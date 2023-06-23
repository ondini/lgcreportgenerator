import React from "react";
import { get3DPoints } from "../utils/dataProcessing";

const Header = ({ data }) => {
  let points3D = get3DPoints(data.LGC_DATA);

  return (
    <header className="App-header">
      <h3> LCG Report</h3>
      <h5>{data.LGC_DATA.config.title} </h5>
      <p>
        {" "}
        Number of observations: {data.LGC_DATA.stat.fDeltaComputed.length}{" "}
      </p>
      <p> Number of points: {data.LGC_DATA.points.length} </p>
    </header>
  );
};

export default Header;
