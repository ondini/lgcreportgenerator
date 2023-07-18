import "./App.css";
import {
  Header,
  Plot3D,
  Histogram,
  Point3DTable,
  ObservationsTable,
  StationsTable,
  FrameTable,
  FrameTree,
} from "./sections";

const dataFile = "SUS-1895_26465_TT2-radial_calage-FTN.json";
const GMData = require(`./jsons_tmp/${dataFile}`);

function App() {
  return (
    <div className="app">
      <div className="main-layout">
        <Header data={GMData} fName={dataFile} />
        <Plot3D data={GMData} />
        <Histogram data={GMData} />
        <StationsTable data={GMData} />
        <Point3DTable data={GMData} />
        <ObservationsTable data={GMData} />
        <FrameTable data={GMData} />
        <FrameTree data={GMData} />
      </div>
    </div>
  );
}

export default App;
