import Vue from "vue";
import Vuex from "vuex";
import { AxiosResponse } from "axios";

import auth, { AuthState } from "./auth";

export function unwrapResponse<data>(response: AxiosResponse<data>): data {
  return response.data;
}

export type RootState = {
  auth: AuthState;
};

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { auth },
});
