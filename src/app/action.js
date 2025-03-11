export const fetchPollutionData = async (startDate, endDate) => {
  try {
    const res = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_ROUTE_HOST}/api/deviceData/`
      `https://atmos.urbansciences.in/adp/v4/getDeviceDataParam/imei/D8BFC0C1DC7F/params/pm2.5cnc,pm10cnc,temp,tvocconc,humidity,co2conc,comodel,o3model/startdate/${endDate}/enddate/${startDate}/ts/mm/avg/15/api/RmGScfm7uh?gaps=1&gap_value=NULL&json=1`
    );
    const data = res.json();
    console.log("data inside action");
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    console.log("Error occurred in fetchPollutionData:");
    throw err;
  }
};

export const fetchPollutionDataOneDayAverage = async (startDate, endDate) => {
  try {
    const res = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_ROUTE_HOST}/api/deviceData/`
      `https://atmos.urbansciences.in/adp/v4/getDeviceDataParam/imei/D8BFC0C1DC7F/params/pm2.5cnc,pm10cnc/startdate/${startDate}/enddate/${endDate}/ts/hh/avg/1/api/RmGScfm7uh?gaps=1&gap_value=NULL&json=1`
    );
    const data = res.json();
    console.log("data inside action");
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    console.log("Error occurred in fetchPollutionData:");
    throw err;
  }
};

export const fetchPollutionDataEightHourAverage = async (
  startDate,
  endDate
) => {
  try {
    const res = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_ROUTE_HOST}/api/deviceData/`
      `https://atmos.urbansciences.in/adp/v4/getDeviceDataParam/imei/D8BFC0C1DC7F/params/comodel/startdate/${startDate}/enddate/${endDate}/ts/hh/avg/1/api/RmGScfm7uh?gaps=1&gap_value=NULL&json=1`
    );
    const data = res.json();
    console.log("data inside action");
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    console.log("Error occurred in fetchPollutionData:");
    throw err;
  }
};
