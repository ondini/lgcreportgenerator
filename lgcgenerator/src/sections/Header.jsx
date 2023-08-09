import { Box } from "@mui/material";
import "./Header.css";
import { measurementTypes } from "../data/constants";
import { numFormatter } from "../data/columnsData/colUtils";
import { linkPathPlaceholder } from "../data/constants";

const Header = ({ data, fName }) => {
  const date_options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  const date = new Date(data.startProcessingTimestamp);

  return (
    <header className="header" id="header">
      <div className="headerRow">
        <div className="info">
          <h1> LGC Report</h1>
          <p className="version">LGC2 {data.LGCVersion} </p>
          <p className="copyright">LGC2 {data.fCopyright} </p>
          <p className="fieldName">File name: </p>
          <p className="title">{data.LGC_DATA.config.title} </p>
          <p className="fieldName">Source file name: </p>
          <p className="fieldContent"> {`${linkPathPlaceholder}`} </p>
          <p className="fieldContent">
            Computed on {date.toLocaleString("en-US", date_options)} with processing time of{" "}
            {numFormatter(data.processingElapsedSeconds, 4)}s.
          </p>
        </div>
        <div className="info">
          <p className="fieldName">Supported meas. types</p>
          <ul>
            {measurementTypes.map((measType) => {
              return <p key={measType}>{measType.slice(1)}</p>;
            })}
          </ul>
        </div>
      </div>
      <div className="headerRow">
        <div className="info">
          <p className="title">Statistics</p>
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
          <p className="title">Dataset</p>
          <p> Number of frames: {data.LGC_DATA.tree.length}</p>
          <p> Unknown frames introduced: {} </p>
          {data.LGC_DATA.points && (
            <>
              <p> Number of points: {data.LGC_DATA.points.length} </p>
              <p> Unknown points introduced: {}</p>
            </>
          )}
          {/* -- compute fixed state false in points.{" "} */}
          {data.LGC_DATA.angles && (
            <>
              <p> Number of angles: {data.LGC_DATA.angles.length} </p>
              <p> Unknown angles introduced: {}</p>
            </>
          )}
          {data.LGC_DATA.distances && (
            <>
              <p> Number of distances: {data.LGC_DATA.distances.length} </p>
              <p> Unknown distances introduced: {}</p>
            </>
          )}
          {data.LGC_DATA.planes.length > 0 && (
            <>
              <p> Number of planes: {data.LGC_DATA.planes.length} </p>
              <p> Unknown planes introduced: {}</p>
            </>
          )}
          {/* -- compute fixed state false in all fixed fields plues reference point fixed.*/}
          {/* <p> Number of lines: {data.LGC_DATA.lines.length} </p> --- TODO FOR WHEN lines are supported by LGC */}
        </div>
        <div className="info">
          <p className="title">Point type numbers:</p>
          {Object.keys(data.LGC_DATA.fPointInfo).map((pointType) => {
            return data.LGC_DATA.fPointInfo[pointType] > 0 ? (
              <p key={pointType}>
                {pointType.slice(1)}: {data.LGC_DATA.fPointInfo[pointType]}
              </p>
            ) : null;
          })}
        </div>
        <div className="info">
          <p className="title">Measurement type numbers:</p>
          {Object.keys(data.LGC_DATA.fMeasInfo).map((measType) => {
            return data.LGC_DATA.fMeasInfo[measType] > 0 ? (
              <p key={measType}>
                {measType.slice(1)}: {data.LGC_DATA.fMeasInfo[measType]}
              </p>
            ) : null;
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
