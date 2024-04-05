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
  console.log(all_merge);
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
  console.log(holiday_data);
  //updateDropdown(); // Call the function after data is fetched
  holiday_name = holiday_data.map((holidays) => holidays.Holiday);
  console.log(holiday_name);
  outputArray = Array.from(new Set(holiday_name));
  console.log(outputArray);
  store_name = holiday_data.map((stores) => stores.Store);
  outputArray2 = Array.from(new Set(store_name));
  console.log(outputArray2);
});

function updatePlot(selectedStore) {
  console.log(selectedStore);
  console.log(holiday_data);
  const storeInfo = holiday_data.filter(
    (stores) => stores.Store == selectedStore
  );
  console.log(storeInfo);

  let layout = {
    title: "Store Revenue by Holiday",
    width: 1000,
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

  const allStoreInfo = all_merge.filter(
    (stores) => stores.Store == selectedStore
  );
  console.log(allStoreInfo);

  const yearStoreInfo = allStoreInfo.filter((years) => years.Year == 2010);
  console.log(yearStoreInfo);

  let weekly_sale = yearStoreInfo.map(
    (weekly_sales) => weekly_sales.Weekly_Sales
  );
  console.log(weekly_sale);
  const sum = weekly_sale.reduce((partialSum, a) => partialSum + a, 0);
  console.log(sum); // 6
}

//fetch('./Resources/all_merge.json')
//  .then(response => response.json())
//  .then(all_data => {
//    console.log(all_data);
//  })
//  .catch(error => {
//    console.error('Error fetching JSON: ', error);
//  });

//  fetch('./Resources/holiday_data.json')
//    .then(response => response.json())
//    .then(data => {
//      holiday_data = data;
//      console.log(holiday_data);
//
//      //Gets all the holiday names
//      let holiday_name = holiday_data.map(holidays => holidays.Holiday)
//      //console.log(holiday_name)
//      //Gets only the unique holiday names
//      function uniqueHoliday(holiday_name) {
//        let outputArray = Array.from(new Set(holiday_name))
//        return outputArray
//    }
//      //Gets all the store names
//      let store_name = holiday_data.map(stores => stores.Store)
//      //console.log(store_name)
//      //Gets all the store names
//      function uniqueStore(name) {
//        let outputArray2 = Array.from(new Set(name))
//        return outputArray2
//    }
//    console.log(uniqueHoliday(holiday_name));
//    console.log(uniqueStore(store_name));
//
//  })

//fetch('./Resources/holiday_data.json')
//  .then(response => response.json())
//  .then(data => {
//    holiday_data = data;
//    //console.log(holiday_data); // Access data here
//    // You can also call a function here passing the data
//    myFunction(holiday_data);
//  })
//
//function myFunction(holiday_data) {
//  // Do something with the fetched data
//  console.log(holiday_data);
//}

//    let layout = {
//      title: "Store Revenue by Holiday",
//      width: 250,
//      height: 200,
//      margin: {
//          l: 5,
//          r: 5,
//          b: 5,
//          t: 5
//      },
//      xaxis: {
//          title: 'Holidays',
//          },
//      yaxis: {
//          title: 'Total Sales',
//          }
//  }
//
//function updatePlot(selectedStore) {
//
//  const storeInfo = data.filter(stores => stores.Store === selectedStore);
//
//  let holidayNames = uniqueHoliday(storeInfo.map(holidays => holidays.Holiday));
//  let traces = [];
//
//  holidayNames.slice(0, 10).forEach(holiday => {
//    let stock = storeInfo.filter(stores => stores.Store === holiday);
//    traces.push({
//      x: stock.map(holidays => holidays.holiday),
//      y: stock.map(sales => sales.weekly_sales),
//      name: holiday,
//      type: 'scatter'
//    });
//  });
//
//  Plotly.newPlot("plot", traces, layout);
//  }

//let holiday_data = fetch('./Resources/holiday_data.json')
//.then(response => response.json())
//.then(holiday_data => {
//  console.log(holiday_data);
//})
//.catch(error => {
//  console.error('Error fetching JSON: ', error);
//});

//let holiday = holiday_data.map(holidays => holidays.Holiday)
//console.log(holiday)

// Data for the chart

//var holidays = [];
//
//holiday_data.forEach(function(item){
//  holidays.push(item.Holiday);
//});
//console.log(holidays)
//
//let holiday_name = holiday_data.map(holiday_names => holiday_names.Holiday)
//console.log(holiday_name)

//function populateBarChart(id) {
//  // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that //individual
//  d3.json(all_merge).then((data) => {
//    let selecteddata = data.all_merge;
//    let value = selecteddata.find(results => results.Store === Store);
//    let valuedata = value;
//    let otuLabels = valuedata.otu_labels;
//    let otuIDs = valuedata.otu_ids;
//    let sampleValues = valuedata.sample_values;
//    let yticks = otuIDs.slice(0, 10).map(id => `OTU ${id}`).reverse();
//    let xticks = sampleValues.slice(0, 10).reverse();
//    let labels = otuLabels.slice(0, 10).reverse();
//    // Trace for the microbial Data
//    let trace1 = {
//      x: xticks,
//      y: yticks,
//      type: "bar",
//      text: labels,
//      orientation: "v"
//    };
//    let layout = {
//      title: `Top 10 OTUs for Individual ${id}`,
//      xaxis: { title: 'Sample Values' },
//      yaxis: { title: 'OTU ID' }
//    };

//function updateDropdown() {
//    let dropdownMenu = d3.select("#selDataset");
//    let dropdownWeatherType = d3.select("#selWeatherType");
//    // Array of month names
//    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//    let weatherTypes = ["Temp", "Rain", "Wind", "Humidity"]
//    // Clear existing options
//    dropdownMenu.html("");
//    dropdownWeatherType.html("");
//    // Iterate over months to create options
//    months.forEach(month => {
//        dropdownMenu.append("option").text(month).property("value", month);
//    });
//
//    weatherTypes.forEach(type => {
//        dropdownWeatherType.append("option").text(type).property("value", type);
//    });
//
//    // Automatically populate with the first month
//    optionChanged(months[0],weatherTypes[0]);
//    // Set the default weather type to "Rain" when the page loads
//    dropdownWeatherType.node().value = "Temp";
//
//    // Event listener for weather type dropdown
//    dropdownWeatherType.on("change", function() {
//        weatherType = this.value; // Update weatherType variable with selected value
//        populateData(d3.select("#selDataset").node().value); // Populate data with selected month
//    });
//};
//
//function populateData(selectedMonth, weatherType) {
//    if (weatherType === "Rain") {
//        // Show rain tables and populate rain data
//        d3.json(RainyDays).then((data) => {
//            let months = data.filter(process => process.Month === selectedMonth);
//            months.sort((a, b) => a.Location.localeCompare(b.Location));
//
//
//            let body = d3.select("#locTableBodyRain");
//            body.html("");
//            months.forEach(month => {
//                let row = body.append('tr');
//                row.append('td').text(month.Location);
//                row.append('td').text(month.RainyDaysPerYear);
//                row.append('td').text(month.TotalRainfallPerYear_inch);
//                row.append('td').text(month.TotalRainfallPerYear_mm);
//            });
//        });
//
//        d3.json(state_summary).then((data) => {
//            let months = data.filter(state => state.Month === selectedMonth);
//
//
//
//
//            let body = d3.select("#stateTableBodyRain");
//            body.html("");
//            months.forEach(month => {
//                let row = body.append('tr');
//                row.append('td').text(month.State);
//                row.append('td').text((month.Avg_Rainfall * 0.0393701).toFixed(2)); // Convert mm to inches and round to 2 decimal places
//                row.append('td').text(month.Avg_Rainfall.toFixed(2)); // Round to 2 decimal places
//
//            });
//        });
//
//        // Hide temperature tables
//        d3.select("#locTableTemp").style("display", "none");
//        d3.select("#stateTableTemp").style("display", "none");
//        d3.select("#locTableWind").style("display", "none");
//        d3.select("#stateTableWind").style("display", "none");
//        d3.select("#locTableHum").style("display", "none");
//        d3.select("#stateTableHum").style("display", "none");
//
//        d3.select("#windplot").style("display", "none");
//        d3.select("#humidityplot").style("display", "none");
//        d3.select("#tempplot").style("display", "none");
//
//
//        // Show rain tables
//        d3.select("#locTableRain").style("display", "block");
//        d3.select("#stateTableRain").style("display", "block");
//    } else if (weatherType === "Temp") {
//        // Show temperature tables and populate temperature data
//        // Use d3.json to fetch JSON data for temperature
//        d3.json(location_summary).then((data) => {
//            let months = data.filter(process => process.Month === selectedMonth);
//
//            months.sort((a, b) => a.Location.localeCompare(b.Location));
//
//
//            let body = d3.select("#locTableBodyTemp");
//            body.html("");
//            months.forEach(month => {
//                let row = body.append('tr');
//                row.append('td').text(month.Location);
//                row.append('td').text(month.Avg_MinTemp.toFixed(2));
//                row.append('td').text(month.Avg_MaxTemp.toFixed(2));
//                row.append('td').text(((month.Avg_MinTemp * 9 / 5) + 32).toFixed(2));
//                row.append('td').text(((month.Avg_MaxTemp * 9 / 5) + 32).toFixed(2));
//            });
//        });
//        d3.json(state_summary).then((data) => {
//            let months = data.filter(state => state.Month === selectedMonth);
//
//            let body = d3.select("#stateTableBodyTemp");
//            body.html("");
//            months.forEach(month => {
//                let row = body.append('tr');
//                row.append('td').text(month.State);
//                row.append('td').text((month.Avg_MinTemp).toFixed(2)); // Convert mm to inches and round to 2 decimal places
//                row.append('td').text(month.Avg_MaxTemp.toFixed(2)); // Round to 2 decimal places
//                row.append('td').text(((month.Avg_MinTemp * 9 / 5) + 32).toFixed(2));
//                row.append('td').text(((month.Avg_MaxTemp * 9 / 5) + 32).toFixed(2));
//
//            });
//        });
//
//        // Hide rain tables
//        d3.select("#locTableRain").style("display", "none");
//        d3.select("#stateTableRain").style("display", "none");
//        d3.select("#locTableWind").style("display", "none");
//        d3.select("#stateTableWind").style("display", "none");
//        d3.select("#locTableHum").style("display", "none");
//        d3.select("#stateTableHum").style("display", "none");
//        d3.select("#windplot").style("display", "none");
//        d3.select("#humidityplot").style("display", "none");
//
//
//        // Show temperature tables
//        d3.select("#locTableTemp").style("display", "block");
//        d3.select("#stateTableTemp").style("display", "block");
//        d3.select("#tempplot").style("display", "block");
//
//    } else if (weatherType === "Wind") {
//        // Show temperature tables and populate temperature data
//        // Use d3.json to fetch JSON data for temperature
//        d3.json(location_summary).then((data) => {
//            let months = data.filter(process => process.Month === selectedMonth);
//            months.sort((a, b) => a.Location.localeCompare(b.Location));
//            let body = d3.select("#locTableBodyWind");
//            body.html("");
//            months.forEach(month => {
//                let row = body.append('tr');
//                row.append('td').text(month.Location);
//                if (month.Avg_WindGustSpeed !== null) {
//                    row.append('td').text(month.Avg_WindGustSpeed.toFixed(2));
//                    row.append('td').text((month.Avg_WindGustSpeed * 0.621371).toFixed(2)); // Convert km/h to mph and round to 2 decimal places
//                } else {
//                    row.append('td').text(""); // Display blank cell if wind speed is null
//                    row.append('td').text(""); // Display blank cell if wind speed is null
//                }
//            });
//        });
//        d3.json(state_summary).then((data) => {
//            let months = data.filter(state => state.Month === selectedMonth);
//
//            let body = d3.select("#stateTableBodyWind");
//            body.html("");
//            months.forEach(month => {
//                let row = body.append('tr');
//                row.append('td').text(month.State);
//                row.append('td').text(month.Avg_WindGustSpeed.toFixed(2));
//                row.append('td').text((month.Avg_WindGustSpeed * 0.621371).toFixed(2)); // Convert km/h to mph and round to 2 decimal places
//
//            });
//        });
//
//        // Hide rain tables
//        d3.select("#locTableRain").style("display", "none");
//        d3.select("#stateTableRain").style("display", "none");
//        d3.select("#locTableTemp").style("display", "none");
//        d3.select("#stateTableTemp").style("display", "none");
//        d3.select("#locTableHum").style("display", "none");
//        d3.select("#stateTableHum").style("display", "none");
//
//        d3.select("#tempplot").style("display", "none");
//        d3.select("#humidityplot").style("display", "none");
//
//        // Show Wind tables
//        d3.select("#locTableWind").style("display", "block");
//        d3.select("#stateTableWind").style("display", "block");
//        d3.select("#windplot").style("display", "block");
//
//    } else if (weatherType === "Humidity") {
//        // Show temperature tables and populate temperature data
//        // Use d3.json to fetch JSON data for temperature
//        d3.json(location_summary).then((data) => {
//            let months = data.filter(process => process.Month === selectedMonth);
//            months.sort((a, b) => a.Location.localeCompare(b.Location));
//            let body = d3.select("#locTableBodyHum"); // Corrected selector here
//            body.html("");
//            months.forEach(month => {
//                let row = body.append('tr');
//                row.append('td').text(month.Location);
//                row.append('td').text(month.Avg_Humidity9am.toFixed(2));
//                row.append('td').text(month.Avg_Humidity3pm.toFixed(2));
//            });
//        });
//        d3.json(state_summary).then((data) => {
//            let months = data.filter(state => state.Month === selectedMonth);
//
//            let body = d3.select("#stateTableBodyHum");
//            body.html("");
//            months.forEach(month => {
//                let row = body.append('tr');
//                row.append('td').text(month.State);
//                row.append('td').text(month.Avg_Humidity9am.toFixed(2));
//                row.append('td').text(month.Avg_Humidity3pm.toFixed(2));
//
//            });
//        });
//
//        // Hide rain tables
//        d3.select("#locTableRain").style("display", "none");
//        d3.select("#stateTableRain").style("display", "none");
//        d3.select("#locTableTemp").style("display", "none");
//        d3.select("#stateTableTemp").style("display", "none");
//        d3.select("#locTableWind").style("display", "none");
//        d3.select("#stateTableWind").style("display", "none");
//        d3.select("#windplot").style("display", "none");
//        d3.select("#tempplot").style("display", "none");
//        // Show Wind tables
//        d3.select("#locTableHum").style("display", "block");
//        d3.select("#stateTableHum").style("display", "block");
//
//        d3.select("#humidityplot").style("display", "block");
//
//
//    }
//};
//
//function addBarCharts(selectedMonth, weatherType) {
//    if (weatherType === "Humidity") {
//        d3.json(location_summary).then((data) => {
//            //filter by the month selected
//            let barMonths = data.filter(results => results.Month === selectedMonth);
//            barMonths.sort((a, b) => a.Location.localeCompare(b.Location));
//            console.log(barMonths);
//
//            //select all of the cities
//            let cityLocation = [];
//            let mornHumidity = [];
//            let aftHumidity = [];
//
//            for (let i = 0; i < barMonths.length; i++) {
//                cityLocation.push(barMonths[i].Location);
//                mornHumidity.push(barMonths[i].Avg_Humidity9am.toFixed(1));
//                aftHumidity.push(barMonths[i].Avg_Humidity3pm.toFixed(1));
//            }
//
//            // Create traces for humidity data
//            let morningHumidity = {
//                y: cityLocation,
//                x: mornHumidity,
//                type: "bar",
//                name: "Morning Humidity",
//                orientation: 'h',
//                marker: {
//                    // color: '#a8bffb'
//                    color: '#91e3ff',
//                    opacity: .7,
//                    line: {
//                        color: '#00040a',
//                        width: 1
//                    }
//                }
//            };
//
//            let afternoonHumidity = {
//                y: cityLocation,
//                x: aftHumidity,
//                type: "bar",
//                name: "Afternoon Humidity",
//                orientation: 'h',
//                marker: {
//                    color: '#3964b3',
//                    opacity: .7,
//                    line: {
//                        color: '#00040a',
//                        width: 1
//                    }
//                }
//            };
//
//            // Apply a title to the layout
//            let layout = {
//                title: `<b>Morning vs Afternoon % Humidity<br> by City in ${selectedMonth}</b>`,
//                // barmode: "group",
//                // Include margins in the layout so the x-tick labels display correctly
//                autosize: false,
//                width: 500,
//                height: 1500,
//                yaxis: {
//                    automargin: true,
//                    //Make the the graph display the cities in the same order as the first chart
//                    autorange: 'reversed'
//                },
//                xaxis: {
//                    //Display the x ticks at the top of the chart
//                    side: 'top',
//                    autorange: 'reversed'
//                },
//                margin: {
//                    width: 200,
//                    height: 20,
//                    l: 120,
//                    r: 20,
//                    b: 50,
//                    t: 100,
//                    pad: 1
//                },
//            };
//
//            // The data array consists of both humidity traces
//            let chartInfo = [morningHumidity, afternoonHumidity];
//            // Plot the humidity chart
//            Plotly.newPlot("humidityplot", chartInfo, layout);
//        });
//    } else if (weatherType === "Wind") {
//        d3.json(location_summary).then((data) => {
//            //filter by the month selected
//            let barMonths = data.filter(results => results.Month === selectedMonth);
//            barMonths.sort((a, b) => a.Location.localeCompare(b.Location));
//            console.log(barMonths);
//
//            //select all of the cities
//            let cityLocation = [];
//            let mornW = [];
//            let aftW = [];
//
//            for (let i = 0; i < barMonths.length; i++) {
//                cityLocation.push(barMonths[i].Location);
//                mornW.push(barMonths[i].Avg_WindSpeed9am.toFixed(2));
//                aftW.push(barMonths[i].Avg_WindSpeed3pm.toFixed(2));
//            }
//
//            // Create traces for Wind data
//            let morningW = {
//                y: cityLocation,
//                x: mornW,
//                type: "bar",
//                name: "Morning Wind Speed",
//                orientation: 'h',
//                marker: {
//                    color: '#91e3ff',
//                    opacity: .7,
//                    line: {
//                        color: '#00040a',
//                        width: 1
//                    }
//                }
//            };
//
//            let afternoonW = {
//                y: cityLocation,
//                x: aftW,
//                type: "bar",
//                name: "Afternoon Wind Speed",
//                orientation: 'h',
//                marker: {
//                    color: '#3964b3',
//                    opacity: .7,
//                    line: {
//                        color: '#00040a',
//                        width: 1
//                    }
//                }
//            };
//
//            // Apply a title to the layout
//            let layout = {
//                title: `<b>Morning vs Afternoon Wind Speed (km/hr)<br> by City in ${selectedMonth}</b>`,
//                barmode: "group",
//                // Include margins in the layout so the x-tick labels display correctly
//                autosize: false,
//                width: 500,
//                height: 1500,
//                yaxis: {
//                    automargin: true,
//                    //Make the the graph display the cities in the same order as the first chart
//                    autorange: 'reversed'
//                },
//                xaxis: {
//                    side: 'top',
//                    autorange: 'reversed'
//                },
//                margin: {
//                    width: 200,
//                    height: 20,
//                    l: 120,
//                    r: 20,
//                    b: 50,
//                    t: 100,
//                    pad: 1
//                },
//            };
//
//            // The data array consists of both Wind traces
//            let chartInfo = [morningW, afternoonW];
//            // Plot the wind chart
//            Plotly.newPlot("windplot", chartInfo, layout);
//        });
//    } else if (weatherType === "Temp") {
//        d3.json(location_summary).then((data) => {
//            //filter by the month selected
//            let barMonths = data.filter(results => results.Month === selectedMonth);
//            barMonths.sort((a, b) => a.Location.localeCompare(b.Location));
//            console.log(barMonths);
//
//            //select all of the cities
//            let cityLocation = [];
//            let mornT = [];
//            let aftT = [];
//
//            for (let i = 0; i < barMonths.length; i++) {
//                cityLocation.push(barMonths[i].Location);
//                mornT.push(barMonths[i].Avg_Temp9am.toFixed(2));
//                aftT.push(barMonths[i].Avg_Temp3pm.toFixed(2));
//            }
//
//            // Create traces for Temperature data
//            let morningT = {
//                y: cityLocation,
//                x: mornT,
//                type: "bar",
//                name: "Morning Temp ",
//                orientation: 'h',
//                marker: {
//                    color: '#91e3ff',
//                    opacity: .7,
//                    line: {
//                        color: '#00040a',
//                        width: 1
//                    }
//                }
//            };
//            let afternoonT = {
//                y: cityLocation,
//                x: aftT,
//                type: "bar",
//                name: "Afternoon Temp",
//                orientation: 'h',
//                marker: {
//                    color: '#3964b3',
//                    opacity: .7,
//                    line: {
//                        color: '#00040a',
//                        width: 1
//                    }
//                }
//            };
//
//            // Apply a title to the layout
//            let layout = {
//                title: `<b>Morning vs Afternoon Temp (\u00B0C)<br> by City in ${selectedMonth}</b>`,
//                barmode: "group",
//                // Include margins in the layout so the x-tick labels display correctly
//                autosize: false,
//                width: 500,
//                height: 1500,
//                yaxis: {
//                    // ticktext: cityLocation.sort().reverse(),
//                    automargin: true,
//                    autorange: 'reversed'
//                },
//                xaxis: {
//                    side: 'top',
//                    autorange: 'reversed'
//                },
//                margin: {
//                    width: 200,
//                    height: 20,
//                    l: 120,
//                    r: 20,
//                    b: 50,
//                    t: 100,
//                    pad: 1
//                },
//                // legend:{'traceorder':'reversed'}
//            };
//
//            // The data array consists of both temperature traces
//            let chartInfo = [morningT, afternoonT];
//            // Plot the temperature chart
//            Plotly.newPlot("tempplot", chartInfo, layout);
//        });
//    } else {
//        // Code for handling other weather types
//    }
//};
//
//function updateMarkers(selectedMonth) {
//    // Fetch the location summary data for markers
//    d3.json("./Data/location_summary.json").then(function(locations) {
//        // Clear existing markers
//        map.eachLayer(function(layer) {
//            if (layer instanceof L.Marker) {
//                map.removeLayer(layer);
//            }
//        });
//
//        // Filter locations based on the selected month
//        let filteredLocations = locations.filter(location => location.Month === selectedMonth);
//
//        // Iterate over the filtered locations
//        filteredLocations.forEach(function(location) {
//            // Extract relevant information
//            var name = location.Location;
//            var latitude = parseFloat(location.Latitude);
//            var longitude = parseFloat(location.Longitude);
//            var month = location.Month;
//            var minTemp = location.Avg_MinTemp.toFixed(2) + "°C / " + (((location.Avg_MinTemp * 9 / 5) + 32).toFixed(2)) + "°F";
//            var maxTemp = location.Avg_MaxTemp.toFixed(2) + "°C / " + (((location.Avg_MaxTemp * 9 / 5) + 32).toFixed(2)) + "°F";
//            var rainfall = location.Avg_Rainfall.toFixed(2);
//            var windSpeed9am = location.Avg_WindSpeed9am.toFixed(2) + " km/h / " + (location.Avg_WindSpeed9am * 0.621371).toFixed(2) + " mph";
//            var windSpeed3pm = location.Avg_WindSpeed3pm.toFixed(2) + " km/h / " + (location.Avg_WindSpeed3pm * 0.621371).toFixed(2) + " mph";
//            var humidity9am = location.Avg_Humidity9am.toFixed(2);
//            var humidity3pm = location.Avg_Humidity3pm.toFixed(2);
//
//            // Create a marker with a popup information
//            var marker = L.marker([latitude, longitude])
//            // make location name blue
//            .bindPopup("<span style='color: blue; font-size: 16px;'>Location: " + name + "</span><br> Month: " + month + "<br> Avg Min Temp: <span style='color: red;'>" + minTemp + "<///span><br> Avg Max Temp: <span style='color: red;'>" + maxTemp + "</span><br> Avg Rainfall: <span style='color: cyan;'>" + rainfall + "mm</span><br> Avg Wind Speed (9am): <span //style='color: darkgrey;'>" + windSpeed9am + "</span><br> Avg Wind Speed (3pm): <span style='color: darkgrey;'>" + windSpeed3pm + "</span><br> Avg Humidity (9am): <span //style='color: grey;'>" + humidity9am + "%</span><br> Avg Humidity (3pm): <span style='color: grey;'>" + humidity3pm + "%</span>")
//                .addTo(map);
//        });
//    });
//};
//
//function optionChanged(id, type) {
//    populateData(id, type);
//    addBarCharts(id, type);
//    updateMarkers(id);
//    console.log(id);
//};
