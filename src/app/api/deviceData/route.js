// export async function POST(request) {
//   const body = await request.json();
//   console.log("body ranking");
//   console.log(body);
//   try {
//     const res = await fetch(
//       `${process.env.DB_HOST}/adp/v4/display/alluring_sky?imei=807D3A3774F9&metrics=pm2.5cnc,temp,humidity,pm10,co,co2,no2&location=LocationName`
//     );
//     if (!res.ok) throw new Error("Error! " + res.status + " " + res.statusText);

//     const data = await res.json();
//     return Response.json(data);
//   } catch (err) {
//     console.log(err);
//     console.log("err");
//     throw err;
//   }
// }
