import { Request, Response } from "express";
import { respond } from "../../services/respond";

export function handleRequest(procedure: any) {
  return function _handleRequest(model: any, message: any) {
    return async function __handleRequest(
      req: Request,
      res: Response
    ): Promise<Response> {
      return respond(res, message({ data: await procedure(model, req) }));
    };
  };
}
