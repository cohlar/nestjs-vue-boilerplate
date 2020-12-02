import { AxiosError } from "axios";
import { Dispatch } from "vuex";
import { createErrorMessage } from "../utils/messages";
import router from "../router";

export const handleApiError = (dispatch: Dispatch, message?: string, showUser = false) => (e: AxiosError): void => {
  if (showUser) {
    alert(createErrorMessage(message ?? e.message))
    // dispatch("ui/showUserMessage", createErrorMessage(message ?? e.message), { root: true });
  } else if (e.response?.status === 401) {
    router.push("/login");
  }
  console.error(e, message);
};
