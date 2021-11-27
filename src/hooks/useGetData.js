import React, { useState, useEffect } from "react";
import getData from "../utils/getData";

const useGetData = () => {
  const [data, setData] = useState({ data: [], rows: 0 });
  useEffect(() => {
    getData()
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);
  return data;
};

export default useGetData;
