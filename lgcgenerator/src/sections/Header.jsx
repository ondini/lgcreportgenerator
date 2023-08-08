import { Box } from "@mui/material";
import "./Header.css";
import { measurementTypes } from "../data/constants";
import { numFormatter } from "../data/columnsData/colUtils";
const Header = ({ data, fName }) => {
  return (
    <header className="header" id="header">
      <div className="headerRow">
        <div className="info">
          <h1> LGC Report</h1>
          <p class="version">LGC2 {data.LGCVersion} </p>
          <p class="copyright">LGC2 {data.fCopyright} </p>
          <p class="fieldName">File name: </p>
          <p class="title">{data.LGC_DATA.config.title} </p>
          <p class="fieldName">Source file name: </p>
          <p class="fieldContent"> {fName} </p>
          <p class="fieldContent">
            Computed on {"X"} with processing time of {"X"}
          </p>
        </div>
        <div className="info">
          <p class="fieldName">Supported meas. types</p>
          <ul>
            {measurementTypes.map((measType) => {
              return <p>{measType.slice(1)}</p>;
            })}
          </ul>
        </div>
      </div>
      <div className="headerRow">
        <div className="info">
          <p class="title">Statistics</p>
          <p> Number of observations: {data.LGC_DATA.fUEOIndices.OIndex} </p>
          <p> Number of unkowns: {data.LGC_DATA.fUEOIndices.UIndex} </p>
          <p> Number of constraints: {data.LGC_DATA.fUEOIndices.CIndex} </p>
          <p> Number of equations: {data.LGC_DATA.fUEOIndices.EIndex} </p>
          <p> Sigma zero aposteriori: {numFormatter(data.LGC_DATA.fLSRelatedInfo.fS0APosteriori, 6)} </p>
          <p>
            Critical value: ({numFormatter(data.LGC_DATA.fLSRelatedInfo.fChiLoLimit, 5)},{" "}
            {numFormatter(data.LGC_DATA.fLSRelatedInfo.fChiUpLimit, 5)})
          </p>
          <p>Number of iterations: {data.LGC_DATA.fLSRelatedInfo.fNumberOfLSIterations}</p>
        </div>
        <div className="info">
          <p class="title">Dataset</p>
          <p> Number of frames: {data.LGC_DATA.tree.length}</p>
          <p> Unknown frames intorducted: {} </p>
          {data.LGC_DATA.points && (
            <>
              <p> Number of points: {data.LGC_DATA.points.length} </p>
              <p> Unknown points intorducted: {}</p>
            </>
          )}
          {/* -- compute fixed state false in points.{" "} */}
          {data.LGC_DATA.angles && (
            <>
              <p> Number of angles: {data.LGC_DATA.angles.length} </p>
              <p> Unknown angles intorducted: {}</p>
            </>
          )}
          {data.LGC_DATA.distances && (
            <>
              <p> Number of distances: {data.LGC_DATA.distances.length} </p>
              <p> Unknown distances intorducted: {}</p>
            </>
          )}
          {data.LGC_DATA.planes.length && (
            <>
              <p> Number of planes: {data.LGC_DATA.planes.length} </p>
              <p> Unknown planes intorducted: {}</p>
            </>
          )}
          {/* -- compute fixed state false in all fixed fields plues reference */}
          point fixed. Numbers of POINT types:
          <p> {data.LGC_DATA.fPointInfo.fNumCala} </p>
          Number of Measurement types:
          {data.LGC_DATA.fMeasInfo.fNumANGL}
          {/* <p> Number of lines: {data.LGC_DATA.lines.length} </p> --- TODO FOR WHEN lines are supported by LGC */}
        </div>
      </div>
    </header>
  );
};

export default Header;
