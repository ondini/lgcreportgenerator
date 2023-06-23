import './App.css';
import Header from './components/Header';
import DataTable from './components/DataTable';
import DataTable2 from './components/DataTable2';
import Plot3D from './components/Plot3D';
import Histogram from './components/Histogram';
import GMData from 'C:\\Users\\okafka\\Developer\\LGCReportGenerator\\lgcgenapp\\src\\data\\21517v2.json';

function App() {
  return (
    <div className="App">
      <Header data={GMData}/>
      <Plot3D data={GMData} />
      <Histogram data={GMData}/>
      <div className='aa'>
      <DataTable2 data={GMData} />
      </div>
    </div>
  );
}

export default App;
