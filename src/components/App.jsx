import React, { useRef, useEffect } from "react";
import getData from "../utils/getData";
import newDataSets from "../utils/newDataset";
import "../web_components/date-chart";

const App = () => {
  const dateChart = useRef(null);

  const handleSubmit = async (e, chart) => {
    e.preventDefault();
    chart.data.datasets = [];
    const fields = dateChart.current.fields;
    const dates = dateChart.current.dates;
    if (fields.length) {
      const { data } = await getData(fields, dates);
      chart.data.datasets = newDataSets(data, fields);
    }
    chart.update();
  };

  useEffect(() => {
    if (dateChart.current) {
      dateChart.current.handleSubmit = handleSubmit;
    }
  }, [dateChart]);

  return (
    <div className="main">
      <date-chart ref={dateChart} />
    </div>
  );
};

export default App;
