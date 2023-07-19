import React from "react";
import "./Header.css";

const Header = ({ data, fName }) => {
  return (
    <header className="header">
      <div className="info">
        <h3> LCG Report</h3>
        <h5>{data.LGC_DATA.config.title} </h5>
        <p>Source file name: {fName} </p>
        <p>Timestamp: JUL 01, 2023, 13:56 </p>
        <h5>Statistics</h5>
        <p>
          {" "}
          Number of observations: {
            data.LGC_DATA.stat.fDeltaComputed.length
          }{" "}
        </p>
        <p> Number of points: {data.LGC_DATA.points.length} </p>
        <p>SIGMA ZERO A POSTERIORI: 0.533921 </p>
        <p> Critical value: (0.84895, 1.15079)</p>
      </div>
    </header>
  );
};

export default Header;
