import { Axiosfit } from "@yggdrasilts/axiosfit/dist";
import { API_BASE_URL } from "../apiConfig";

import { LoggedOutUserService } from "../services/user";

export interface ModelBase {
  id?: number;
  created?: Date;
  lastUpdated?: Date;
}

export const loggedOutUserService = new Axiosfit<LoggedOutUserService>().baseUrl(API_BASE_URL).create(LoggedOutUserService);
