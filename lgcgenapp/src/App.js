import React, { useState } from 'react';
import "./App.css";
import { Header, Plot3D, Histogram, DataTable, Observations, StationsTable, FrameTable, FrameTree } from "./sections";


const dataFile = "LB_calcul_3D_CCS_IP_8_HLS_4_BF.json";
const GMData = require(`./data/${dataFile}`); //`C:/Users/okafka/Developer/LGCReportGenerator/lgcgenapp/src/data/${dataFile}`)

function App() {
  return (
    <div className="app">
      <div className="main-layout">
        <Header data={GMData} fName={dataFile} />
        <Plot3D data={GMData} />
        <Histogram data={GMData} />
        <StationsTable data={GMData} />
        <DataTable data={GMData} />
        <Observations data={GMData} />
        <FrameTable data={GMData} />
        <FrameTree data={GMData} />
      </div>
    </div>
  );
}

export default App;
