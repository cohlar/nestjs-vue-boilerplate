import { AxiosfitRequestInterceptor } from "@yggdrasilts/axiosfit/dist";
import { cookies, TOKEN_COOKIE_KEY } from "../utils/cookies";

interface Config {
  headers: {
    ["Access-Control-Allow-Origin"]: string;
    ["Authorization"]: string;
  };
}

export class BaseInterceptor implements AxiosfitRequestInterceptor {
  onRequest(config: Config): Config {
    config.headers["Access-Control-Allow-Origin"] = "*";
    return config;
  }
}

export class SessionInterceptor implements AxiosfitRequestInterceptor {
  onRequest(config: Config): Config {
    const token = cookies.get(TOKEN_COOKIE_KEY);
    config.headers["Authorization"] = `Token ${token}`;
    return config;
  }
}
