import { Request, Response } from "express";
import { respond } from "../../services/respond";

export function handleRequest<F extends Function,
  G extends Function,
  H extends Function>(procedure: F) {
  return (model: G, message: H) => async (
    req: Request,
    res: Response
  ): Promise<Response> => respond(res, message({ data: await procedure(model, req) }));
}
