import './App.css';
import { Header, Plot3D, Histogram, DataTable } from './sections';
// import { useState, useEffect } from 'react';
import GMData from 'C:\\Users\\okafka\\Developer\\LGCReportGenerator\\lgcgenapp\\src\\data\\SUS-1895_26465_TT2-radial_calage-FTN.json';
// let GMData = require('C:\\Users\\okafka\\Developer\\LGCReportGenerator\\lgcgenapp\\src\\data\\21517v2.json');
// let GMData = require("C:/Users/okafka/cernbox/Documents/LGC_projects/21517v2.json");


function App() {
  // const [GMData, setData] = useState({})
  // const fetchJson = () => {
  //   fetch("C:/Users/okafka/cernbox/Documents/LGC_projects/21517v2.json")
  //   .then(response => {
  //     return response.json();
  //   }).then(data => {
  //     setData(data);
  //   }).catch((e) => {
  //     console.log(e.message);
  //   });
  // }
  // useEffect(() => {
  //   fetchJson()
  // },[])

  return (
    <div className="app">
      <div className='main-layout'>
        <Header data={GMData}/>
        <Plot3D data={GMData} />
        <Histogram data={GMData}/>
        <DataTable data={GMData} />
      </div>
    </div>
  );
}

export default App;
