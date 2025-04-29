"use client";

import { useEffect, useState } from "react";
import BasicCard from "./singleCard";
import {
  fetchPollutionData,
  fetchPollutionDataOneDayAverage,
  fetchPollutionDataEightHourAverage,
  fetchNoiseData,
} from "./action";
import { aqiData } from "./fetchAqi";
import moment from "moment-timezone";
import FilledAlerts from "./alertBox";

export default function Home() {
  const [data, setData] = useState(null);
  const [aqi, setAqi] = useState();
  const [soundData, setSoundData] = useState();

  const [isDataAvailable, setIsDataAvailable] = useState(false);

  const pollutionFetchFunction = async (
    startDate,
    endDate,
    startDate24HoursAgo,
    startDate8HoursAgo,
    endDateDayAvg
  ) => {
    const pollutionData = await fetchPollutionData(startDate, endDate);
    // console.log("pollutionData");
    // console.log(pollutionData);

    const noiseData = await fetchNoiseData(startDate, endDate);
    setSoundData(noiseData);
    console.log("Noise data");
    console.log(noiseData);

    const oneDayAvgData = await fetchPollutionDataOneDayAverage(
      startDate24HoursAgo,
      endDateDayAvg
    );
    if (pollutionData["pm2.5cnc"] > 0 && pollutionData["pm10cnc"] > 0) {
      setIsDataAvailable(true);
    } else {
      setIsDataAvailable(false);
    }

    console.log("one day average data is ");
    console.log(oneDayAvgData);
    const total = oneDayAvgData.reduce(
      (acc, item) => {
        if (item["pm2.5cnc"] !== "NULL") {
          acc.pm25 += item["pm2.5cnc"];
        }
        if (item.pm10cnc !== "NULL") {
          acc.pm10 += item.pm10cnc;
        }
        // acc.no2model += item.no2model;
        // acc.so2model += item.so2model;
        return acc;
      },
      { pm25: 0, pm10: 0 }
    );

    // console.log("total is ", total);

    // Calculate the average by dividing the total by the number of objects
    const numberOfEntries = oneDayAvgData.length;
    const averagesOfOneDay = {
      pm25: total.pm25 / numberOfEntries,
      pm10: total.pm10 / numberOfEntries,
      // no2: total.no2model / numberOfEntries,
      // so2: total.so2model / numberOfEntries,
    };

    // console.log("Averages:", averagesOfOneDay);

    const eightHourAvgData = await fetchPollutionDataEightHourAverage(
      startDate8HoursAgo,
      endDateDayAvg
    );

    // console.log("average of eight hour", eightHourAvgData);

    //find the average of 8hours data of co
    const totalOfEgihtHour = eightHourAvgData.reduce(
      (acc, item) => {
        if (item["comodel"] !== "NULL") {
          acc.comodel += item["comodel"];
        }
        return acc;
      },
      { comodel: 0 }
    );

    const numberOfEntriesForEgihtHourAvg = oneDayAvgData.length;
    const averagesOfEightHour = {
      comodel: totalOfEgihtHour.comodel / numberOfEntriesForEgihtHourAvg,
    };

    // console.log("Averages of eight hour:", averagesOfEightHour);
    const pollutantsForAQI = {
      ...averagesOfOneDay,
      ...averagesOfEightHour,
    };
    // console.log("merged Averages :", pollutantsForAQI);
    if (pollutantsForAQI) {
      // console.log("the length is greater than 0");
      const aqiValue = aqiData(pollutantsForAQI);
      // console.log("AQI value is:");
      // console.log(aqiValue);
      setAqi(aqiValue);
      // setData({ ...pollutionData, ...aqi });
    }

    // console.log("pollution data is ");
    // console.log(pollutionData);
    // console.log(oneDayAvgData);
    // console.log(averageOfEgihtHour);
    const validData = pollutionData.find((item) => item["pm2.5cnc"] !== "NULL");
    if (validData) {
      setData(pollutionData);
    } else {
      setData(null);
    }
  };

  useEffect(() => {
    const fetchAndUpdateData = () => {
      // Get the current time in IST
      const nowIST = moment().tz("Asia/Kolkata");

      // Format the start date as "YYYY-MM-DDTHH:mm"
      const startDate = nowIST.subtract(1, "minute").format("YYYY-MM-DDTHH:mm");
      const endDate = nowIST.subtract(14, "minute").format("YYYY-MM-DDTHH:mm");
      // console.log("the enddate is ");
      // console.log(endDate, startDate);

      const startDate24HoursAgo = moment(startDate)
        .subtract(24, "hours")
        .format("YYYY-MM-DDTHH:mm");

      const endDateDayAvg = moment(startDate)
        .subtract(1, "minute")
        .format("YYYY-MM-DDTHH:mm");
      console.log("24 hours before:", startDate24HoursAgo, endDateDayAvg);

      // Get 8 hours before startDate
      const startDate8HoursAgo = moment(startDate)
        .subtract(8, "hours")
        .format("YYYY-MM-DDTHH:mm");
      // console.log("8 hours before:", startDate8HoursAgo);

      // console.log("Fetching data with startDate:", startDate);

      // Fetch data with the startDate
      pollutionFetchFunction(
        startDate,
        endDate,
        startDate24HoursAgo,
        startDate8HoursAgo,
        endDateDayAvg
      );
    };

    // Fetch data immediately on mount
    fetchAndUpdateData();
    // pollutionFetchFunction(startDate);

    // Set up an interval to run the function every minute
    const intervalId = setInterval(fetchAndUpdateData, 60000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {/* <div className="flex items-center justify-center p-4  bg-gray-100 rounded-lg">
        <h1 className="text-4xl font-bold text-blue-600">
          Environment Monitor
        </h1>
      </div> */}

      {/* <div className="mt-2 ml-2">
        <h1 className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
          <h5 className="mb-2 text-2xl font-bold text-gray-700">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="font-normal text-gray-600">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </h1>
      </div> */}
      <div>
        {data ? (
          <BasicCard PollutionData={data} aqiData={aqi} soundData={soundData} />
        ) : (
          <div>
            <FilledAlerts />
          </div>
        )}
      </div>
    </div>
  );
}
