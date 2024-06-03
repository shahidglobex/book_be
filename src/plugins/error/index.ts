import { Prisma } from "@prisma/client";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { ZodError } from "zod";
import { AppErrors } from "../../lib/errors";

import { AppError } from "../../utils/error.util";

async function errorHandlerPlugin(app: FastifyInstance) {
  app.setErrorHandler(function (error, request, reply) {
    this.log.error(error);

    if (error.validation && error.validation[0]?.instancePath === "/password") {
      return reply.status(400).send({
        ...new AppError(
          AppErrors.ValidationError,
          "Password must be minimum 8 & maximum 25 characters, contain Uppercase, lowercase, special character & number"
        ),
      });
    }

    if (error.validation && error.validation[0]?.instancePath === "/ip") {
      return reply.status(400).send({
        ...new AppError(AppErrors.ValidationError, "Invalid IP address format"),
      });
    }

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({ ...error });
    }

    if (error.statusCode && error.statusCode >= 400 && error.statusCode < 600) {
      error.message = error.validation
        ? error.message.replace(new RegExp("body/", "g"), "")
        : error.message;
      return reply.status(error.statusCode).send({
        ...new AppError(
          {
            errorCode: error.validation
              ? AppErrors.ValidationError.errorCode
              : "UnkownError",
            statusCode: error.statusCode,
          },
          error.message
        ),
      });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const errorTargetRaw: string = Array.isArray(error.meta?.target)
          ? error.meta?.target[0]
          : typeof error.meta?.target === "string"
            ? error.meta?.target
            : "";
        const errorTarget = errorTargetRaw.split("_")[1] || errorTargetRaw;

        const DbFieldsMap: { [key: string]: string } = {
          mstruserid: "username",
        };

        return reply.status(400).send({
          ...new AppError(
            { errorCode: AppErrors.ValidationError.errorCode, statusCode: 400 },
            `${DbFieldsMap[errorTarget] || errorTarget} already exists`
          ),
        });
      }
    }

    // Zod Error Handler
    if (error instanceof ZodError) {
      if (error.errors[0].code === "invalid_type") {
        return reply.status(400).send({
          ...new AppError(
            AppErrors.ValidationError,
            `${error.errors[0]?.path.join(".")} is ${error.errors[0].message}`
          ),
        });
      }
      if (error.errors[0].code === "invalid_enum_value") {
        return reply.status(400).send({
          ...new AppError(
            AppErrors.ValidationError,
            `Invalid value provided for ${error.errors[0]?.path[0]}`
          ),
        });
      }
    }

    //  Kysely
    if ("node" in error && error.message === "no result") {
      return reply.status(404).send({
        ...new AppError(AppErrors.NotFound),
      });
    }

    // this.log.error(error);
    return reply.status(500).send({
      ...new AppError(AppErrors.InternalError),
    });
  });
}

export default fp(errorHandlerPlugin);
