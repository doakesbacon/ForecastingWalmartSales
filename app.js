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

function updatePlot(selectedStore) {
  console.log(selectedStore);
  console.log(holiday_data);
  const storeInfo = holiday_data.filter(
    (stores) => stores.Store == selectedStore
  );
  //console.log(storeInfo);

  let layout = {
    title: "Store Revenue by Holiday Week",
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
  Plotly.newPlot("plot", traces, layout);

  //Chart for monthly sales

  const allStoreInfo = all_merge.filter(
    (stores) => stores.Store == selectedStore
  );

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
  Plotly.newPlot("plot2", traces2, layout2);

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
  Plotly.newPlot("plot3", traces3, layout3);

  //Gets all the info based on the selected store

  //console.log(allStoreInfo);
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
}
