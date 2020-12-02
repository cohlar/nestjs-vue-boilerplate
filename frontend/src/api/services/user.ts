import { AxiosResponse } from "axios";
import { Body, HTTP, Interceptors, POST } from "@yggdrasilts/axiosfit/dist";
import { API_PREFIX } from "../apiConfig";
import { BaseInterceptor } from "../interceptors";
import { ModelBase } from "./index";

export interface User extends ModelBase {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface UserRegistrationRequest extends User {
  password1: string;
  password2: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface AuthTokenResponse {
  access_token: string;
}

export interface RegistrationAuthToken {
  key: string;
}

@HTTP(API_PREFIX, { usePromises: true })
@Interceptors(BaseInterceptor)
export class LoggedOutUserService {
  @POST("/auth/login")
  public login(@Body() body: UserLoginRequest): Promise<AxiosResponse<AuthTokenResponse>> {
    return Object();
  }
}
