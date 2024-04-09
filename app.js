////Get data paths
//let all_merge_2010 = "Resources/all_merge_2010.json";
//let all_merge_2011 = "./Resources/all_merge_2011.json";
//let all_merge_2012 = "./Resources/all_merge_2012.json";
////
////let weatherType = "Rain"; // Initialize weatherType with "Rain"
////

let all_merge;
////// Fetch the JSON data and console log it
d3.json("./Resources/all_merge.json").then(function (result) {
  all_merge = result;
  //console.log(all_merge);
  //updateDropdown(); // Call the function after data is fetched
});

let holiday_data;
let holiday_name;
let outputArray;
let store_name;
let outputArray2;
////// Fetch the JSON data and console log it
d3.json("./Resources/holiday_data.json").then(function (result) {
  holiday_data = result;
  //console.log(holiday_data);
  //updateDropdown(); // Call the function after data is fetched
  holiday_name = holiday_data.map((holidays) => holidays.Holiday);
  //console.log(holiday_name);
  outputArray = Array.from(new Set(holiday_name));
  //console.log(outputArray);
  store_name = holiday_data.map((stores) => stores.Store);
  outputArray2 = Array.from(new Set(store_name));
  //console.log(outputArray2);
});

let predictions;
////// Fetch the JSON data and console log it
d3.json("./Resources/predictions.json").then(function (result) {
  predictions = result;
  console.log(predictions);
  //updateDropdown(); // Call the function after data is fetched
});

function updatePlot(selectedStore) {
  console.log(selectedStore);
  console.log(holiday_data);
  const storeInfo = holiday_data.filter(
    (stores) => stores.Store == selectedStore
  );
  const predictionInfo = predictions.filter(
    (stores) => stores.Store == selectedStore
  );
  const allStoreInfo = all_merge.filter(
    (stores) => stores.Store == selectedStore
  );

  //console.log(predictionInfo);
  //console.log(storeInfo);

  //Chart for Revenue per holiday
  let layout = {
    title: "Store Revenue by Holiday",
    width: 800,
    height: 500,
    margin: {
      l: 200,
      r: 80,
      b: 80,
      t: 80,
    },
    xaxis: {
      title: "Holidays",
    },
    yaxis: {
      title: "Total Sales",
    },
  };
  let traces = [];

  traces.push({
    x: storeInfo.map((holidays) => holidays.Holiday),
    y: storeInfo.map((sales) => sales.Weekly_Sales),
    name: "holiday",
    type: "bar",
  });
  Plotly.newPlot("holidaysales", traces, layout);

  //Chart for monthly sales

  let timestamps = allStoreInfo.map((dates) => dates.Date);

  let formattedDates = timestamps.map((timestamp) => {
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    return `${year}-${month.toString().padStart(2, "0")}`;
  });

  let layout2 = {
    title: "Store Revenue by Month",
    width: 800,
    height: 500,
    margin: {
      l: 200,
      r: 80,
      b: 80,
      t: 80,
    },
    xaxis: {
      title: "Date",
      tickvals: formattedDates,
      ticktext: formattedDates,
      tickangle: -45,
    },
    yaxis: {
      title: "Total Sales",
    },
  };

  let traces2 = [];

  traces2.push({
    x: formattedDates,
    y: allStoreInfo.map((sales) => sales.Weekly_Sales),
    name: "Weekly Sales",
    type: "bar",
  });
  Plotly.newPlot("storebymonth", traces2, layout2);

  //Chart for Gas prices

  let layout3 = {
    title: "Store Revenue vs Gas Prices",
    width: 800,
    height: 500,
    margin: {
      l: 200,
      r: 80,
      b: 80,
      t: 80,
    },
    xaxis: {
      title: "Gas Price",
      tickangle: -45,
    },
    yaxis: {
      title: "Total Sales",
    },
  };

  let traces3 = [];
  let roundedPrices = allStoreInfo.map(
    (fuel_prices) => Math.round(parseFloat(fuel_prices.Fuel_Price) * 10) / 10
  );
  traces3.push({
    x: roundedPrices,
    y: allStoreInfo.map((sales) => sales.Weekly_Sales),
    name: "Weekly Sales",
    type: "bar",
  });
  Plotly.newPlot("gasprices", traces3, layout3);

  //Chart for Prediction Revenue per holiday
  let layout4 = {
    title: "Prediction Store Revenue by Holiday",
    width: 800,
    height: 500,
    margin: {
      l: 200,
      r: 80,
      b: 80,
      t: 80,
    },
    xaxis: {
      title: "Holidays",
    },
    yaxis: {
      title: "Total Sales",
    },
  };
  let traces4 = [];

  traces4.push({
    x: predictionInfo.map((holidays) => holidays.Holiday),
    y: predictionInfo.map((sales) => sales.Weekly_Sales),
    name: "holiday",
    type: "bar",
  });
  Plotly.newPlot("predicationholiday", traces4, layout4);

  //Chart for Prediction monthly sales

  let timeStampsPrediction = predictionInfo.map((dates) => dates.Date);

  let formattedPredictionDates = timeStampsPrediction.map(
    (timeStampsPrediction) => {
      let date = new Date(timeStampsPrediction);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      return `${year}-${month.toString().padStart(2, "0")}`;
    }
  );

  let layout5 = {
    title: "Prediction Store Revenue by Month",
    width: 800,
    height: 500,
    margin: {
      l: 200,
      r: 80,
      b: 80,
      t: 80,
    },
    xaxis: {
      title: "Date",
      tickvals: formattedPredictionDates,
      ticktext: formattedPredictionDates,
      tickangle: -45,
    },
    yaxis: {
      title: "Total Sales",
    },
  };

  let traces5 = [];

  traces5.push({
    x: formattedPredictionDates,
    y: predictionInfo.map((sales) => sales.Weekly_Sales),
    name: "Weekly Sales",
    type: "bar",
  });
  Plotly.newPlot("predicationbymonth", traces5, layout5);

  //Chart for Prediction Gas prices

  let layout6 = {
    title: "Predication Store Revenue vs Gas Prices",
    width: 800,
    height: 500,
    margin: {
      l: 200,
      r: 80,
      b: 80,
      t: 80,
    },
    xaxis: {
      title: "Gas Price",
      tickangle: -45,
    },
    yaxis: {
      title: "Total Sales",
    },
  };

  let traces6 = [];
  let roundedPricesPrediction = predictionInfo.map(
    (fuel_prices) => Math.round(parseFloat(fuel_prices.Fuel_Price) * 10) / 10
  );
  traces6.push({
    x: roundedPricesPrediction,
    y: predictionInfo.map((sales) => sales.Weekly_Sales),
    name: "Weekly Sales",
    type: "bar",
  });
  Plotly.newPlot("predicationgasprices", traces6, layout6);

  //Gets all the info based on the selected store

  //Gets all the info of the selected store and the year 2010
  const storeInfo2010 = allStoreInfo.filter((years) => years.Year == 2010);
  //console.log(storeInfo2010);
  //Gets only the weekly sales for the selected store and year 2010
  let weeklySale2010 = storeInfo2010.map(
    (weeklySale2010) => weeklySale2010.Weekly_Sales
  );
  //console.log(weeklySale2010);
  //Gets the sum of all the weekly sales
  const sum2010 = weeklySale2010.reduce((partialSum, a) => partialSum + a, 0);
  //console.log(Math.round(sum2010)); // 6

  //Gets all the info of the selected store and the year 2011
  const storeInfo2011 = allStoreInfo.filter((years) => years.Year == 2011);
  //console.log(storeInfo2011);
  //Gets only the weekly sales for the selected store and year 2011
  let weeklySale2011 = storeInfo2011.map(
    (weeklySale2011) => weeklySale2011.Weekly_Sales
  );
  //console.log(weeklySale2011);
  //Gets the sum of all the weekly sales
  const sum2011 = weeklySale2011.reduce((partialSum, a) => partialSum + a, 0);
  //console.log(Math.round(sum2011)); // 6

  //Gets all the info of the selected store and the year 2012
  const storeInfo2012 = allStoreInfo.filter((years) => years.Year == 2012);
  //console.log(storeInfo2012);
  //Gets only the weekly sales for the selected store and year 2012
  let weeklySale2012 = storeInfo2012.map(
    (weeklySale2012) => weeklySale2012.Weekly_Sales
  );
  //console.log(weeklySale2012);
  //Gets the sum of all the weekly sales
  const sum2012 = weeklySale2012.reduce((partialSum, a) => partialSum + a, 0);
  //console.log(Math.round(sum2012)); // 6

  const sums = {
    2010: weeklySale2010.reduce((partialSum, a) => partialSum + a, 0),
    2011: weeklySale2011.reduce((partialSum, a) => partialSum + a, 0),
    2012: weeklySale2012.reduce((partialSum, a) => partialSum + a, 0),
  };

  let tableBody = d3.select("#sample-metadata");
  tableBody.html("");

  Object.entries(sums).forEach(([year, sum]) => {
    let row = tableBody.append("tr");
    row.append("td").text(year + ": $");
    row.append("td").text(Math.round(sum).toLocaleString());
  });

  //Gets all the prediction info based on the selected store

  //Gets all the info of the selected store and the year 2010
  //const predictionInfo2010 = predictionInfo.filter(
  //  (years) => years.Year == 2010
  //);
  //console.log(storeInfo2010);
  //Gets only the weekly sales for the selected store and year 2010
  //let weeklyPredictionSale2010 = predictionInfo2010.map(
  //  (weeklyPredictionSale2010) => weeklyPredictionSale2010.Weekly_Sales
  //);
  //console.log(weeklySale2010);
  //Gets the sum of all the weekly sales
  //const predictionsum2010 = weeklyPredictionSale2010.reduce((partialSum, a) => partialSum + a, 0);
  //console.log(Math.round(sum2010)); // 6

  //Gets all the info of the selected store and the year 2011
  const predictionInfo2012 = predictionInfo.filter(
    (years) => years.Year == 2012
  );
  //console.log(storeInfo2011);
  //Gets only the weekly sales for the selected store and year 2011
  let weeklyPredictionSale2012 = predictionInfo2012.map(
    (weeklyPredictionSale2012) => weeklyPredictionSale2012.Weekly_Sales
  );
  //console.log(weeklySale2011);
  //Gets the sum of all the weekly sales
  //const predictionsum2011 = weeklySale2011.reduce((partialSum, a) => partialSum + a, 0);
  //console.log(Math.round(sum2011)); // 6

  //Gets all the info of the selected store and the year 2012
  const predictionInfo2013 = predictionInfo.filter(
    (years) => years.Year == 2013
  );
  //console.log(storeInfo2012);
  //Gets only the weekly sales for the selected store and year 2012
  let weeklyPredictionSale2013 = predictionInfo2013.map(
    (weeklyPredictionSale2013) => weeklyPredictionSale2013.Weekly_Sales
  );
  //console.log(weeklySale2012);
  //Gets the sum of all the weekly sales
  //const sum2012 = weeklySale2012.reduce((partialSum, a) => partialSum + a, 0);
  //console.log(Math.round(sum2012)); // 6

  const predictionSums = {
    2012: weeklyPredictionSale2012.reduce((partialSum, a) => partialSum + a, 0),
    2013: weeklyPredictionSale2013.reduce((partialSum, a) => partialSum + a, 0),
  };

  let tableBodyPrediction = d3.select("#sample-metadata-prediction");
  tableBodyPrediction.html("");

  Object.entries(predictionSums).forEach(([year, sum]) => {
    let row = tableBodyPrediction.append("tr");
    row.append("td").text(year + ": $");
    row.append("td").text(Math.round(sum).toLocaleString());
  });
}
