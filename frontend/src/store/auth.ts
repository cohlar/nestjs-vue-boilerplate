import Vue from "vue";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { RootState, unwrapResponse } from "./index";
import { loggedOutUserService } from "../api/services";
import { AuthTokenResponse, UserLoginRequest } from "../api/services/user";
import { handleApiError } from "../api/errorHandler";
import { cookies, EMAIL_COOKIE_KEY, TOKEN_COOKIE_KEY } from "../utils/cookies";
import router from "../router";

interface UserState {
  email: string;
  token: string;
}

export class AuthState {
  user: UserState = { email: "", token: "" };
  cookieAuthLoaded = false;
}

const getters: GetterTree<AuthState, RootState> = {
  isLoggedIn: (state: AuthState) => !!(state.user && state.user.email && state.user.token),
};

const mutations: MutationTree<AuthState> = {
  SET_USER(state: AuthState, newUser: UserState) {
    Vue.set(state, "user", newUser);
  },
  UNSET_USER(state: AuthState) {
    Vue.delete(state, "user");
  },
  SET_COOKIE_AUTH_LOADED(state: AuthState) {
    Vue.set(state, "cookieAuthLoaded", true);
  },
};

const actions: ActionTree<AuthState, RootState> = {
  loginUser({ commit, dispatch }, request: UserLoginRequest): Promise<void> {
    const handleLoginSuccess = (response: AuthTokenResponse) => {
      const token = response.access_token;
      if (token) {
        cookies.set(TOKEN_COOKIE_KEY, token, { path: "/" });
        cookies.set(EMAIL_COOKIE_KEY, request.email, { path: "/" });
        commit("SET_USER", { email: request.email, token: token });
      } else {
        throw new Error(`Token not found upon successful user authentication, user: ${request.email}`);
      }
    };

    return loggedOutUserService
      .login(request)
      .then(unwrapResponse)
      .then(handleLoginSuccess)
      .catch(handleApiError(dispatch, `Could not login, ${request.email}`));
  },
  loginFromCookies({ commit }): void {
    const userFromCookies = {
      email: cookies.get(EMAIL_COOKIE_KEY),
      token: cookies.get(TOKEN_COOKIE_KEY),
    };
    if (userFromCookies.email && userFromCookies.token) {
      commit("SET_USER", userFromCookies);
    }
    commit("SET_COOKIE_AUTH_LOADED");
  },
  logoutUser({ commit }): void {
    cookies.remove(TOKEN_COOKIE_KEY);
    cookies.remove(EMAIL_COOKIE_KEY);
    commit("UNSET_USER");
    router.push("/login");
  },
};

export default {
  namespaced: true,
  state: new AuthState(),
  getters: getters,
  mutations: mutations,
  actions: actions,
};
