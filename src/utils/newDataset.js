const newDataSets = (data, fields) => {
  const colors = {
    temp: "#BE3729",
    chill: "#4E837E",
    dew: "#36A7B4",
    heat: "#B2B052",
    hum: "#7AA364",
    wspdhi: "#393675",
    bar: "#C657AD",
    rain: "#225DE5",
  };

  let datasets = [];

  for (const field of fields) {
    datasets.push({
      label: field,
      data: data.map((item) => {
        const newItem = {};
        const date = new Date(item.date);
        newItem.date = date.toLocaleDateString("en-US", { month: "long" });
        newItem[field] = item[field];
        return newItem;
      }),
      borderColor: colors[field],
      backgroundColor: colors[field],
      parsing: {
        xAxisKey: "date",
        yAxisKey: field,
      },
    });
  }

  return datasets;
};

export default newDataSets;
