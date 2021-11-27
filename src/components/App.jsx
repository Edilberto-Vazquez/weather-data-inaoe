import React, { useState, useEffect, Suspense } from "react";
import useGetdata from "../hooks/useGetData";
import "../web_components/date-chart";

const App = () => {
  const { data, rows } = useGetdata();
  return <div>{data.length && <date-chart data={JSON.stringify(data)} />}</div>;
};

export default App;
