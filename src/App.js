import Papa from 'papaparse';
import React, { useEffect, useState } from 'react';
import CompletionGrid from "./components/Completions";
import ProductionChart from './components/LineChart';
import MapVisualization from "./components/MapVisualization";
import ProductionGrid from "./components/Productions";
const completionsCsv = require('./files/completions.csv');
const productionCsv = require('./files/production.csv');


const App = () => {
  const [completionData, setCompletionData] = useState([]);
  const [productionData, setProductionData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      Papa.parse(productionCsv, {
        download: true,
        header: true,
        complete: (result) => {
          const productionData = result.data;
          setProductionData(productionData);
        },
        error: (error) => {
          console.error('Error parsing production.csv', error);
        },
      });

      Papa.parse(completionsCsv, {
        download: true,
        header: true,
        complete: (result) => {
          const completionData = result.data;
          setCompletionData(completionData);
        },
        error: (error) => {
          console.error('Error parsing completion.csv', error);
        },
      });
    };

    fetchData();
  }, []);

  const handleWellNameChange = (updatedDataItem) => {
    const updatedData = completionData.map((item) =>
      item.wellAPI === updatedDataItem.wellAPI ? updatedDataItem : item
    );
    setCompletionData(updatedData);
  };

  return (
    <div>
      <h1>Data Challenge App</h1>
      <CompletionGrid completionsData={completionData} onWellNameChange={handleWellNameChange} productionData={productionData} />
      <ProductionGrid productionData={productionData} />
      <ProductionChart productionData={productionData} />
      <MapVisualization completionsData={completionData} />
    </div>
  );
};

export default App;
