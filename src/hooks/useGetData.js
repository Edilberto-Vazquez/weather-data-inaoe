import React, { useState, useEffect } from "react";
import getData from "../utils/getData";

const useGetData = (fields) => {
  const [data, setData] = useState();

  useEffect(() => {
    getData(fields)
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);
  return data;
};

export default useGetData;
