// import NodeRSA from "node-rsa";
import dayjs from "dayjs";
// var API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// var CRM_BASE_URL = process.env.NEXT_PUBLIC_CRM_URl;
import duration from "dayjs/plugin/duration";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
dayjs.extend(duration);
const weekDayMapping = {
  0: "SUN",
  1: "MON",
  2: "TUE",
  3: "WED",
  4: "THU",
  5: "FRI",
  6: "SAT",
};

export const monthMapping = {
  0: "JAN",
  1: "FEB",
  2: "MAR",
  3: "APR",
  4: "MAY",
  5: "JUN",
  6: "JUL",
  7: "AUG",
  8: "SEP",
  9: "OCT",
  10: "NOV",
  11: "DEC",
};

export const ColorMaps = [
  "primary",
  "secondary",
  "green-500",
  "red-500",
  "yellow-500",
  "blue-500",
];

export const EncryptPayload = (payload) => {
  const base64PublicKey = process.env.NEXT_PUBLIC_KEY;

  const publicKeyString = Buffer.from(base64PublicKey, "base64").toString(
    "utf-8"
  );
  const encryptKey = new NodeRSA(publicKeyString);
  const encryptedPayload = encryptKey.encrypt(payload, "base64");
  return encryptedPayload;
};

// export { API_BASE_URL, CRM_BASE_URL };

export const parseDecimal = (value) => {
  return parseFloat(value).toFixed(2);
};

//---------------------------cookies -----------------
export const ClearCookie = (cookieName) => {
  document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
};

export const ClearAllCookies = () => {
  const cookies = ["jwtoken"];

  cookies.forEach((cookiename) => {
    ClearCookie(cookiename);
  });
};

export const getQueryParameters = () => {
  var url = atob(window.location.search.replace("?", ""));
  if (url) {
    return JSON.parse(url);
  }
};

export const ClearFilters = () => {
  var url = window.location.origin + window.location.pathname;
  return url;
};

export const PrintLogs = (message, value) => {
  if (process.env.NODE_ENV === "production") {
    return void 0;
  } else {
    console.log(`${message} ->`, value);
  }
};

export const formatDate = (dateString) => {
  if (
    !dateString ||
    dateString === "N/A" ||
    dateString === "0001-01-01T00:00:00Z"
  )
    return "--";
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const date = new Date(dateString);

  // Format the date
  const formattedDate = date
    .toLocaleDateString("en-GB", options)
    .replace(",", "")
    .split(" ");

  return `${formattedDate[0]}-${formattedDate[1]}-${formattedDate[2]}`;
};

export const getDateObject = ({
  date,
  // currentFormat = "YYYY-MM-DD",
  newFormat = "DD-MM-YYYY",
}) => {
  if (typeof date == "object") {
    date = dayjs(date);
  }
  const currentDate = dayjs(date);
  const weekDay = currentDate.day();
  const dayOfMonth = currentDate.date();
  const year = currentDate.year();
  const month = currentDate.month();
  const milliseconds = currentDate.millisecond();
  const unixEpoch = parseInt(currentDate.unix(milliseconds));
  const time = currentDate.format("hh:mm:ss A");

  return {
    newFormattedDate: currentDate.format(newFormat),
    weekDay,
    dayOfMonth,
    weekDayString: weekDayMapping[weekDay],
    year,
    month,
    monthDayString: monthMapping[month],
    unixEpoch,
    milliseconds: milliseconds,
    currentDate,
    time,
  };
};

export const validateField = ({ type, value }) => {
  switch (type) {
    case "email":
      let re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(value).toLowerCase());
    case "mobile":
      if (value == "0000000000") {
        return false;
      } else {
        let regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        return regex.test(value);
      }
    case "number":
      regex = /^[0-9]+$/;
      return regex.test(value);
    case "password":
      if (value.length < 8) {
        return false;
      } else {
        return true;
      }
  }
};

// export function getCookieClient(cname) {
//   if (typeof document == "undefined") {
//     return;
//   }
//   let name = cname + "=";
//   // let decodedCookie = decodeURIComponent(document.cookie);
//   // let ca = decodedCookie.split(";");
//   let ca = document.cookie.split(";");
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == " ") {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }
export function getCookieClient(cname) {
  // Check if document is defined (i.e., running in a browser environment)
  if (typeof document === "undefined") {
    console.log("Document is undefined, exiting function.");
    return;
  }

  let name = cname + "=";
  console.log(`Looking for cookie with name: ${name}`);
  console.log("Raw document.cookie:", document.cookie);

  // Decode the cookie string (if needed)
  let decodedCookie = decodeURIComponent(document.cookie);
  console.log(`Decoded cookie string: ${decodedCookie}`);

  // Split the decoded cookie string into individual cookies
  let ca = decodedCookie.split(";");
  console.log(`Cookies array: ${ca}`);

  // Loop through the cookies array
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    console.log(`Processing cookie: ${c}`);

    // Trim leading spaces from the cookie string
    c = c.trim();
    console.log(`Trimmed cookie: ${c}`);

    // Check if the cookie starts with the desired name
    if (c.indexOf(name) === 0) {
      console.log(`Found the cookie: ${c}`);
      // Return the value after the '=' sign
      return c.substring(name.length);
    }
  }

  // If no cookie is found, return an empty string
  console.log(`Cookie with name '${cname}' not found.`);
  return "";
}

export const CreateQueryString = (paramString, RowData) => {
  const keys = paramString?.split(",");
  if (keys) {
    const obj = keys.reduce((acc, key) => {
      const trimmedKey = key.trim();
      acc[trimmedKey] = RowData[trimmedKey] ?? null;
      return acc;
    }, {});
    const jsonString = JSON.stringify(obj);
    const base64String = btoa(jsonString);
    return base64String;
  }
  // return btoa("");
  return "";
};

export function calculateAge(dob) {
  // Ensure dob is a Date object
  const birthDate = new Date(dob);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDifference = currentDate.getMonth() - birthDate.getMonth();

  // Adjust age if birthday hasn't occurred yet this year
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

export const GetKeyFromQueryString = (paramString, keyname) => {
  try {
    const params = decodeURIComponent(paramString);
    const queryString = JSON.parse(atob(params));
    return queryString[keyname];
  } catch (err) {
    return null;
  }
};

export const GetParsedQueryString = (paramString) => {
  const params = decodeURIComponent(paramString);
  const queryString = JSON.parse(atob(params));
  return queryString;
};

export const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null; // Return null if the cookie is not found
};
