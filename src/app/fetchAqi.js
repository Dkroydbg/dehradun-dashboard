export const aqiData = (pollutants) => {
  // Function to calculate sub-index for PM10
  console.log("inside the aqi function");
  console.log(pollutants);
  function pm10_SI(x) {
    let varValue = null;
    if (x <= 100) {
      varValue = x;
    } else if (x > 100 && x <= 250) {
      varValue = 100 + (x - 100) * (100 / 150);
    } else if (x > 250 && x <= 350) {
      varValue = 200 + (x - 250);
    } else if (x > 350 && x <= 430) {
      varValue = 300 + (x - 350) * (100 / 80);
    } else if (x > 430) {
      varValue = 400 + (x - 430) * (100 / 80);
    }
    return Math.round(varValue);
  }

  // Function to calculate sub-index for PM2.5
  function pm25_SI(x) {
    let varValue = null;
    if (x <= 30) {
      varValue = x * (50 / 30);
    } else if (x > 30 && x <= 60) {
      varValue = 50 + (x - 30) * (50 / 30);
    } else if (x > 60 && x <= 90) {
      varValue = 100 + (x - 60) * (100 / 30);
    } else if (x > 90 && x <= 120) {
      varValue = 200 + (x - 90) * (100 / 30);
    } else if (x > 120 && x <= 250) {
      varValue = 300 + (x - 120) * (100 / 130);
    } else if (x > 250) {
      varValue = 400 + (x - 250) * (100 / 130);
    }
    return Math.round(varValue);
  }

  // Function to calculate sub-index for SO2
  function so2_SI(x) {
    let varValue = null;
    if (x <= 40) {
      varValue = x * (50 / 40);
    } else if (x > 40 && x <= 80) {
      varValue = 50 + (x - 40) * (50 / 40);
    } else if (x > 80 && x <= 380) {
      varValue = 100 + (x - 80) * (100 / 300);
    } else if (x > 380 && x <= 800) {
      varValue = 200 + (x - 380) * (100 / 420);
    } else if (x > 800 && x <= 1600) {
      varValue = 300 + (x - 800) * (100 / 800);
    } else if (x > 1600) {
      varValue = 400 + (x - 1600) * (100 / 800);
    }
    return Math.round(varValue);
  }

  // Function to calculate sub-index for NO2
  function no2_SI(x) {
    let varValue = null;
    if (x <= 40) {
      varValue = x * (50 / 40);
    } else if (x > 40 && x <= 80) {
      varValue = 50 + (x - 40) * (50 / 40);
    } else if (x > 80 && x <= 180) {
      varValue = 100 + (x - 80) * (100 / 100);
    } else if (x > 180 && x <= 280) {
      varValue = 200 + (x - 180) * (100 / 100);
    } else if (x > 280 && x <= 400) {
      varValue = 300 + (x - 280) * (100 / 120);
    } else if (x > 400) {
      varValue = 400 + (x - 400) * (100 / 120);
    }
    return Math.round(varValue);
  }

  // Function to calculate sub-index for CO
  function co_SI(x) {
    let varValue = null;
    if (x <= 1) {
      varValue = x * (50 / 1);
    } else if (x > 1 && x <= 2) {
      varValue = 50 + (x - 1) * (50 / 1);
    } else if (x > 2 && x <= 10) {
      varValue = 100 + (x - 2) * (100 / 8);
    } else if (x > 10 && x <= 17) {
      varValue = 200 + (x - 10) * (100 / 7);
    } else if (x > 17 && x <= 34) {
      varValue = 300 + (x - 17) * (100 / 17);
    } else if (x > 34) {
      varValue = 400 + (x - 34) * (100 / 17);
    }
    return Math.round(varValue);
  }

  // Function to calculate sub-index for O3
  function o3_SI(x) {
    let varValue = null;
    if (x <= 50) {
      varValue = x * (50 / 50);
    } else if (x > 50 && x <= 100) {
      varValue = 50 + (x - 50) * (50 / 50);
    } else if (x > 100 && x <= 168) {
      varValue = 100 + (x - 100) * (100 / 68);
    } else if (x > 168 && x <= 208) {
      varValue = 200 + (x - 168) * (100 / 40);
    } else if (x > 208 && x <= 748) {
      varValue = 300 + (x - 208) * (100 / 539);
    } else if (x > 748) {
      varValue = 400 + (x - 400) * (100 / 539);
    }
    return Math.round(varValue);
  }

  // Edit the values here to calculate AQI
  //   const pollutants = {
  //     pm25: 26.617978,
  //     pm10: 105.213483,
  //     so2: 11.193751,
  //     no2: null,
  //     co: null,
  //     o3: null,
  //   };

  // List of available pollutants
  const lis = Object.keys(pollutants).filter((key) => pollutants[key] !== null);

  // Function map for pollutants
  const functionMap = {
    pm25: pm25_SI,
    pm10: pm10_SI,
    // so2: so2_SI,
    // no2: no2_SI,
    comodel: co_SI,
    // o3: o3_SI,
  };

  // Calculate the sub-indices
  let subIndices = lis
    .filter((key) => functionMap[key]) // Ensure the key exists in functionMap
    .map((key) => functionMap[key](pollutants[key]));

  // AQI Calculation
  if (pollutants["pm25"] === null && pollutants["pm10"] === null) {
    console.log("Need at least one out of PM2.5 or PM10 to calculate AQI.");
  } else if (lis.length < 3) {
    console.log("At least three pollutants are required to calculate AQI.");
  } else {
    subIndices = lis.map((key) => functionMap[key](pollutants[key]));
    console.log("Sub-indices:", subIndices);
    const AQI = Math.max(...subIndices);
    console.log("AQI:", AQI);
    return AQI;
  }
};
