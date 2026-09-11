import type { RequestHandler } from "express";
import type { ZodType } from "zod";

export const validateBody = (schema: ZodType): RequestHandler => (request, _response, next) => {
  request.body = schema.parse(request.body);
  next();
};

export const validateParams = (schema: ZodType): RequestHandler => (request, response, next) => {
  response.locals.validatedParams = schema.parse(request.params);
  next();
};

export const validateQuery = (schema: ZodType): RequestHandler => (request, response, next) => {
  response.locals.validatedQuery = schema.parse(request.query);
  next();
};
