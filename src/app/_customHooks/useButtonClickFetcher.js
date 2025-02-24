import { ClearAllCookies, getCookie, PrintLogs } from "../_utils/constant";
import { routes } from "../_utils/routes";

export const fetcher = async (data) => {
  const options = {
    ...data.options
  };

  const response = await fetch(data.url, options);
  if (!response.ok) {
    const Errorresponse = await response.json();
    return {
      statusCode: response.status,
      error: "failed with not ok status code",
      ...Errorresponse
    };
  }
  return response.json();
};

// ---------------------------------------------------Common Api fetcher ---------------------------------

export const ApiFetcher = async (service, payload, params) => {
  PrintLogs("this is payload", payload);
  const routeConfig =
    typeof routes[service] === "function"
      ? routes[service](params)
      : routes[service];
  const { method, url } = routeConfig;
  console.log("url", url);
  const token = getCookie("jwtoken");
  var responseData;
  const options = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": method !== "GET" ? "application/json" : undefined
    },
    cache: "no-store",
    body: method !== "GET" ? JSON.stringify(payload) : undefined, //put,delete request ke liye bhi koi change karne ki jarurat nahi hai yahan
    credentials: "include"
  };
  var responseData = await fetcher({ url: url, options });
  if (responseData?.code === 401) {
    ClearAllCookies();
    window.location.reload();
    return;
  }
  return responseData;
};

export const AuthFetcher = async (service, token) => {
  const { method, url } = routes[service];
  return await fetcher({
    url: url,
    options: {
      method: method,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      cache: "no-store",
      credentials: "include"
    }
  });
};
