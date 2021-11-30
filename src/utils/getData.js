// const API = "https://weather-data-inaoe.herokuapp.com/api/v1/";
const API =
  "https://weather-data-inaoe.herokuapp.com/api/v1/select-records/by-date?datepart=month&table=weather_clouds";

const getQuery = (fields, dates) => {
  let query = "";
  for (const field of fields) {
    query += `&fields=${field}`;
  }
  const fromdate = `&fromdate=${dates.fromdate}T00:00:00`;
  const todate = `&todate=${dates.todate}T00:00:00`;
  return `${API}${fromdate}${todate}${query}`;
};

const getData = async (fields, dates) => {
  try {
    const res = await fetch(getQuery(fields, dates));
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {}
};

export default getData;
