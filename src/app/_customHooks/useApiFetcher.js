// "use client";
// import { useEffect, useState } from "react";
// import { routes } from "../_utils/routes";
// import {
//   ClearAllCookies,
//   ClearCookie,
//   EncryptPayload,
//   getCookieClient,
// } from "../_utils/constant";

// const useApiFetcher = (serviceName, body = {}, params, dependency = void 0) => {
//   // if (!serviceName) return {};
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchApiData = async () => {
//     try {
//         // const token = getCookieClient("jwtoken");
//       const routeConfig =
//         typeof routes[serviceName] === "function"
//           ? routes[serviceName]({ ...params, token })
//           : routes[serviceName];
//       var { method, url } = routeConfig;
//     //   const detailsToken = getCookieClient("detailsToken");
//       const options = {
//         method,
//         headers: {
//         //   authorization: Bearer ${token},
//           authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGMxMzkzNDhmYzdlYWQ3N2FkZjYzMyIsImlhdCI6MTczMzE2MTc5OSwiZXhwIjoxNzMzMTY1Mzk5fQ.h3Qeid1hk4D-aWH6P2hDJ_jxg9rim_hakP6M4bKJGBk`,
//           "Content-Type": method !== "GET" ? "application/json" : undefined,
//         },
//         cache: "no-store",
//         // body:
//         //   method !== "GET"
//         //     ? JSON.stringify({ data: EncryptPayload(body) })
//         //     : undefined,

//         body:
//         method !== "GET"
//           ? JSON.stringify(body)
//           : undefined,
//         credential: "include",
//       };

//       const response = await fetch(url, options);
//       if (response.status === 401) {
//         ClearAllCookies();
//         window.location.reload();
//         return null;
//       }
//       if (!response.ok) {
//         var Errorresponse = await response.json();
//         setError({
//           statusCode: response.status,
//           error: "failed with not ok status code",
//           ...Errorresponse,
//         });
//       }

//       const responseData = await response.json();
//       setData(responseData.data ? responseData.data : responseData);
//     } catch (err) {
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     // console.log(typeof routes[serviceName]);
//     fetchApiData();
//   }, [dependency]);

//   return { loading, error, data };
// };

// export default useApiFetcher;

"use client";
import { useEffect, useState } from "react";
import { routes } from "../_utils/routes";
import {
  ClearAllCookies,
  ClearCookie,
  EncryptPayload,
  getCookieClient,
  getCookie,
  PrintLogs
} from "../_utils/constant";

const useApiFetcher = (serviceName, body = {}, params, dependency = void 0) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApiData = async () => {
    try {
      const routeConfig =
        typeof routes[serviceName] === "function"
          ? routes[serviceName](params)
          : routes[serviceName];

      const token = getCookie("jwtoken");
      var { method, url } = routeConfig;
      const options = {
        method,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": method !== "GET" ? "application/json" : undefined
        },
        cache: "no-store",
        body: method !== "GET" ? JSON.stringify(body) : undefined
      };

      const response = await fetch(url, options);
      if (response.status === 401) {
        ClearAllCookies();
        window.location.href = "/login";
        return null;
      } else if (response.status === 403) {
        window.location.href = "/";
        return null;
      } else if (!response.ok) {
        var Errorresponse = await response.json();
        setError({
          statusCode: response.status,
          error: "failed with not ok status code",
          ...Errorresponse
        });
      }

      const responseData = await response.json();
      setData(responseData.data ? responseData.data : responseData);
    } catch (err) {
      setError({
        statusCode: 400,
        error: "failed with not ok status code"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiData();
  }, [dependency]);

  return { loading, error, data };
};

export default useApiFetcher;
