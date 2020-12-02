export enum MessageType {
  INFO = "info",
  ERROR = "error",
  SUCCESS = "success",
  WARNING = "warning",
}

export interface UserMessage {
  message: string;
  type: MessageType;
  action?: () => void;
}
