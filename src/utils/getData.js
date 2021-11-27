const API = "https://weather-data-inaoe.herokuapp.com/api/v1/";

const testAPI =
  "https://weather-data-inaoe.herokuapp.com/api/v1/select-records/by-date?datepart=day&fromdate=2019-01-01T00%3A00%3A00&todate=2019-02-28T23%3A50%3A00&table=weather_clouds&fields=dew";

const getData = async () => {
  const url = testAPI;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Fetch Error: ", error);
  }
};

export default getData;
