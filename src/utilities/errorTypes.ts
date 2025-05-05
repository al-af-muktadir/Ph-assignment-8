import { STATUS_CODES } from "./errorConstants";


export type TErrorName =
  | "ValidationError"
  | "ZodValidationError"
  | "NotFoundError"
  | "AuthenticationError"
  | "AuthorizationError"
  | "InternalServerError";

export type TStatusCode = (typeof STATUS_CODES)[keyof typeof STATUS_CODES];
