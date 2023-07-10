import "./App.css";
import { Header, Plot3D, Histogram, DataTable, Observations } from "./sections";
// import { useState, useEffect } from 'react';
const dataFile = "SUS-1895_26465_TT2-radial_calage-FTN.json";
const GMData = require(`./data/${dataFile}`); //`C:/Users/okafka/Developer/LGCReportGenerator/lgcgenapp/src/data/${dataFile}`)

function App() {
  return (
    <div className="app">
      <div className="main-layout">
        <Header data={GMData} fName={dataFile} />
        <Plot3D data={GMData} />
        <Histogram data={GMData} />
        <DataTable data={GMData} />
        <Observations data={GMData} />
      </div>
    </div>
  );
}

export default App;
