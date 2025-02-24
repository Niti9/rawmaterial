var API_BASE_URL;

const CURRENT_ENV = process.env.NEXT_PUBLIC_NODE_ENV || process.env.NODE_ENV;
// const CURRENT_ENV = "local";

switch (CURRENT_ENV) {
  case "production":
    API_BASE_URL = "https://api.teamsynk.com/api";
    // process.env.PRODUCTION_URL || process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL;
    break;
  case "development":
    API_BASE_URL = "http://3.108.255.36/api";
    // process.env.STAGE_URL || process.env.NEXT_PUBLIC_STAGE_BASE_URL;
    break;
  default:
    API_BASE_URL = "http://localhost:8000/api";
    // process.env.NEXT_PUBLIC_LOCAL_BASE_URL || process.env.LOCAL_BASE_URL;
    break;
}

export { API_BASE_URL };
