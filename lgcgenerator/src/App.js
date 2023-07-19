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
  TreeGraph
} from "./sections";

const dataFile = "LB_calcul_3D_CCS_IP_8_HLS_4_BF.json";
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
        <TreeGraph/>
      </div>
    </div>
  );
}

export default App;
