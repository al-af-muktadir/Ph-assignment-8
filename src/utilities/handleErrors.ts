import { ErrorRequestHandler } from "express";
import { StatusFullError } from "./customError";

interface ValidationErrorResponse {
    success: boolean;
    status: number;
  message: string;
  stack?: string;
}

export const handleErrors: ErrorRequestHandler = (err, _req, res, _next) => {
  //   // handling mongoose errors
  //   if (err instanceof mongoose.Error.ValidationError) {
  //     res.status(400).json({
  //       success: false,
  //       message: err.message || "Validation failed",
  //       statusCode: 400,
  //       error: {
  //         details: {
  //           name: err.name,
  //           errors: err.errors,
  //         },
  //       },
  //       stack: err.stack,
  //     } as ValidationErrorResponse);
  //   }

  //   // handling cast errors
  //   if (err instanceof MongooseError) {
  //     if (err?.name === "CastError") {
  //       res.status(400).json({
  //         success: false,
  //         message: "Invalid ObjectId",
  //         statusCode: 400,
  //         error: {
  //           name: err.name,
  //           errors: err,
  //         },
  //         stack: err.stack,
  //       });
  //     }
  //   }
  //   // handling zod validation errors
  //   if (err instanceof ZodError) {
  //     res.status(400).json({
  //       success: false,
  //       message: err.name,
  //       statusCode: 400,
  //       error: {
  //         name: err.name,
  //         errors: err.errors || err.issues,
  //       },
  //       stack: err.stack,
  //     });
  // //   }

  if (err instanceof StatusFullError) {
    res.status(err.status).json({
      success: false,
      status: err.status,
      message: err.message || "Something went wrong",
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  // handling all other errors except zod and mongoose
  

  if (err instanceof Error) {
    res.status(400).json({
      success: false,
      status: 400,
      message: "Something went wrong",
      error: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  // handling unknown errors
  res.status(500).json({
    success: false,
    message: "Unknown error occurs",
    status: 500,
    error: JSON.stringify(err),
  });
};
