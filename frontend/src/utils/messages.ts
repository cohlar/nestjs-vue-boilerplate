import { MessageType, UserMessage } from "../models/UserMessage";

export const createErrorMessage = (message: string): UserMessage => ({
  message: message,
  type: MessageType.INFO,
});

export const getAlertColor = (type: MessageType): string => {
  switch (type) {
    case MessageType.INFO:
      return "info";
    case MessageType.ERROR:
      return "error";
    case MessageType.SUCCESS:
      return "success";
    case MessageType.WARNING:
      return "warning";
  }
};

export const GENERAL_ERROR_MESSAGE = "Oops! we didn't expect that, but we're on it 🤓 please try again later or contact support.";
