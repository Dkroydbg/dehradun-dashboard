import * as React from "react";
import capitalizeString from "./capitalizeString";
import Image from "next/image";
import Paper from "@mui/material/Paper";

export default function SpacingGrid({ PollutionData, aqiData }) {
  const scrollRef = React.useRef(null);
  const [pollutants, setPollutants] = React.useState([]);

  // let textColor = "text-black";

  React.useEffect(() => {
    if (PollutionData && PollutionData.length > 0) {
      setPollutants([
        { name: "PM2.5", value: PollutionData[0]["pm2.5cnc"] },
        // { name: "SO2", value: PollutionData[0]["so2model"] },
        { name: "PM10", value: PollutionData[0]["pm10cnc"] },
        { name: "CO", value: PollutionData[0]["comodel"] },
        { name: "CO2", value: PollutionData[0]["co2conc"] },
        { name: "O3", value: PollutionData[0]["o3model"] },
        { name: "TVOC", value: PollutionData[0]["tvocconc"] },
        { name: "Temp", value: PollutionData[0]["temp"] },
        { name: "Humid", value: PollutionData[0]["humidity"] },
        { name: "AQI", value: aqiData },
      ]);
    }
  }, [PollutionData]);

  // React.useEffect(() => {
  //   const scrollContainer = scrollRef.current;
  //   let isScrollingDown = true;

  //   const scroll = () => {
  //     if (isScrollingDown) {
  //       scrollContainer.scrollTo({
  //         top: scrollContainer.scrollHeight,
  //         behavior: "smooth",
  //       });

  //       setTimeout(() => {
  //         isScrollingDown = false;
  //         scroll();
  //       }, 10000); // Pause at the bottom
  //     } else {
  //       scrollContainer.scrollTo({
  //         top: 0,
  //         behavior: "smooth",
  //       });

  //       setTimeout(() => {
  //         isScrollingDown = true;
  //         scroll();
  //       }, 10000); // Pause at the top
  //     }
  //   };

  //   scroll();
  // }, []);

  // const pollutants = [
  //   { name: "PM2.5", value: 110 },
  //   { name: "SO2", value: 10 },
  //   { name: "PM10", value: 250 },
  //   { name: "CO", value: 1 },
  //   { name: "CO2", value: 1600 },
  //   { name: "O3", value: 99 },
  //   { name: "NO2", value: 456 },
  //   { name: "Temperature", value: 25 },
  //   { name: "Humidity", value: 78 },
  //   { name: "AQI", value: 112 },
  // ];

  return (
    <Paper
      sx={{
        width: "100%",
        marginBottom: 0,
        zIndex: 1,
        overflowY: "auto",
        height: "100vh",
        display: "flex", // Enables left sidebar + right content layout
      }}
      className="bg-black"
    >
      {/* Sidebar */}
      <div className="w-[120px] bg-slate-300 items-center justify-center p-4 shadow-md rounded-lg">
        <Image
          src="/respirer.png"
          alt="respirer Icon"
          width={104}
          height={124}
          // className=" bg-[#f7fafd] "
        />
      </div>

      {/* Cards Section */}
      <div className="flex-1 p-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mx-2 p-1 shadow-lg max-w-full">
          {pollutants.map((pollutant, index) => {
            let textColor = "text-black"; // default color
            if (pollutant.name === "PM2.5") {
              if (pollutant.value >= 401 && pollutant.value <= 500) {
                textColor = "text-red-700";
              } else if (pollutant.value >= 301 && pollutant.value <= 400) {
                textColor = "text-red-400";
              } else if (pollutant.value >= 201 && pollutant.value <= 300) {
                textColor = "text-orange-400";
              } else if (pollutant.value >= 101 && pollutant.value <= 200) {
                textColor = "text-yellow-700";
              } else if (pollutant.value >= 51 && pollutant.value <= 100) {
                textColor = "text-green-400";
              } else if (pollutant.value >= 0 && pollutant.value <= 50) {
                textColor = "text-green-600";
              }
            }
            if (pollutant.name === "PM10") {
              if (pollutant.value > 424) {
                textColor = "text-red-700";
              } else if (pollutant.value >= 355 && pollutant.value <= 424) {
                textColor = "text-red-400";
              } else if (pollutant.value >= 255 && pollutant.value <= 354) {
                textColor = "text-orange-400";
              } else if (pollutant.value >= 155 && pollutant.value <= 254) {
                textColor = "text-yellow-700";
              } else if (pollutant.value >= 55 && pollutant.value <= 154) {
                textColor = "text-green-400";
              } else if (pollutant.value >= 0 && pollutant.value <= 54) {
                textColor = "text-green-600";
              }
            }
            if (pollutant.name === "SO2") {
              if (pollutant.value > 1600) {
                textColor = "text-red-700";
              } else if (pollutant.value >= 801 && pollutant.value <= 1600) {
                textColor = "text-red-400";
              } else if (pollutant.value >= 381 && pollutant.value <= 800) {
                textColor = "text-orange-400";
              } else if (pollutant.value >= 81 && pollutant.value <= 380) {
                textColor = "text-yellow-700";
              } else if (pollutant.value >= 41 && pollutant.value <= 80) {
                textColor = "text-green-400";
              } else if (pollutant.value >= 0 && pollutant.value <= 40) {
                textColor = "text-green-600";
              }
            }
            if (pollutant.name === "CO2") {
              if (pollutant.value >= 5001) {
                textColor = "text-brown-500";
              }
              if (pollutant.value >= 2501 && pollutant.value <= 5000) {
                textColor = "text-red-800";
              } else if (pollutant.value >= 1501 && pollutant.value <= 2500) {
                textColor = "text-red-500";
              } else if (pollutant.value >= 1001 && pollutant.value <= 1500) {
                textColor = "text-yellow-700";
              } else if (pollutant.value >= 701 && pollutant.value <= 1000) {
                textColor = "text-yellow-300";
              } else if (pollutant.value >= 0 && pollutant.value <= 700) {
                textColor = "text-green-600";
              }
            }
            if (pollutant.name === "NO2") {
              if (pollutant.value > 400) {
                textColor = "text-red-700";
              } else if (pollutant.value >= 281 && pollutant.value <= 400) {
                textColor = "text-red-400";
              } else if (pollutant.value >= 181 && pollutant.value <= 280) {
                textColor = "text-orange-400";
              } else if (pollutant.value >= 81 && pollutant.value <= 180) {
                textColor = "text-yellow-700";
              } else if (pollutant.value >= 41 && pollutant.value <= 80) {
                textColor = "text-green-400";
              } else if (pollutant.value >= 0 && pollutant.value <= 40) {
                textColor = "text-green-600";
              }
            }
            if (pollutant.name === "CO") {
              if (pollutant.value > 34.0) {
                textColor = "text-red-700";
              } else if (pollutant.value >= 17.1 && pollutant.value <= 34.0) {
                textColor = "text-red-400";
              } else if (pollutant.value >= 10.1 && pollutant.value <= 17.0) {
                textColor = "text-orange-400";
              } else if (pollutant.value >= 2.1 && pollutant.value <= 10.0) {
                textColor = "text-yellow-700";
              } else if (pollutant.value > 1.0 && pollutant.value <= 2.0) {
                textColor = "text-green-400";
              } else if (pollutant.value >= 0 && pollutant.value <= 1.0) {
                textColor = "text-green-600";
              }
            }
            if (pollutant.name === "O3") {
              if (pollutant.value > 749) {
                textColor = "text-red-700";
              } else if (pollutant.value >= 209 && pollutant.value <= 748) {
                textColor = "text-red-400";
              } else if (pollutant.value >= 169 && pollutant.value <= 208) {
                textColor = "text-orange-400";
              } else if (pollutant.value >= 101 && pollutant.value <= 168) {
                textColor = "text-yellow-700";
              } else if (pollutant.value >= 51 && pollutant.value <= 100) {
                textColor = "text-green-400";
              } else if (pollutant.value >= 0 && pollutant.value <= 50) {
                textColor = "text-green-600";
              }
            }
            if (pollutant.name === "AQI") {
              if (pollutant.value > 400) {
                textColor = "text-red-700";
              } else if (pollutant.value >= 301 && pollutant.value <= 400) {
                textColor = "text-red-400";
              } else if (pollutant.value >= 201 && pollutant.value <= 300) {
                textColor = "text-orange-400";
              } else if (pollutant.value >= 101 && pollutant.value <= 200) {
                textColor = "text-yellow-700";
              } else if (pollutant.value >= 51 && pollutant.value <= 100) {
                textColor = "text-green-400";
              } else if (pollutant.value >= 0 && pollutant.value <= 50) {
                textColor = "text-green-600";
              }
            }
            return (
              <div key={index} className="flex justify-center p-1 my-3">
                <Paper
                  sx={{
                    height: "calc(88vh / 3 - 16px)",
                    width: "90%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 10px",
                  }}
                  className="shadow-xl shadow-white rounded-3xl bg-[#f7fafd]"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div style={{ flex: 1, textAlign: "center" }}>
                      {/* <h1 className="pl-2 font-extrabold text-[60px] md:text-6xl mb-1"> */}
                      {pollutant.fullName}
                      {pollutant.name === "Temp" ||
                      pollutant.name === "Humid" ? (
                        <h1 className="pl-1 text-3xl md:text-4xl"> </h1>
                      ) : (
                        <h1 className="pl-2 font-extrabold text-6xl md:text-6xl pb-2">
                          {capitalizeString(pollutant.name)}
                        </h1>
                      )}
                      {pollutant.name === "Temp" && (
                        <div className="flex justify-center items-center h-full">
                          <Image
                            src="/thermometer.png"
                            alt="Temperature Icon"
                            width={84}
                            height={94}
                            className=""
                          />
                        </div>
                      )}
                      {pollutant.name === "Humid" && (
                        <div className="flex justify-center items-center h-full">
                          <Image
                            src="/humidity.png"
                            alt="Humidity Icon"
                            width={84}
                            height={114}
                            className=" bg-[#f7fafd] "
                          />
                        </div>
                      )}
                    </div>
                    <div
                      style={{ height: "calc(70vh / 3 - 16px)" }}
                      className="bg-gray-700 w-[4px] rounded-lg"
                    ></div>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <h1
                        className={`text-6xl md:text-6xl font-extrabold ${textColor}`}
                      >
                        {pollutant.name !== "CO"
                          ? Math.ceil(pollutant.value)
                          : pollutant.value}
                      </h1>
                      {(pollutant.name === "PM2.5" ||
                        pollutant.name === "PM10" ||
                        pollutant.name === "NO2" ||
                        pollutant.name === "SO2" ||
                        pollutant.name === "O3") && (
                        <p className="text-xl font-extrabold md:text-xl text-gray-700">
                          µg/m³
                        </p>
                      )}
                      {pollutant.name === "CO" && (
                        <p className="text-xl font-extrabold md:text-xl text-gray-700">
                          mg/m³
                        </p>
                      )}
                      {pollutant.name === "CO2" && (
                        <p className="text-xl font-extrabold md:text-xl text-gray-700">
                          ppm
                        </p>
                      )}
                      {pollutant.name === "Temp" && (
                        <p className="text-xl font-extrabold md:text-xl text-gray-700">
                          °C
                        </p>
                      )}
                      {pollutant.name === "Humid" && (
                        <p className="text-xl font-extrabold md:text-xl text-gray-700">
                          %
                        </p>
                      )}
                    </div>
                  </div>
                </Paper>
              </div>
            );
          })}
        </div>
      </div>
    </Paper>
  );
}
