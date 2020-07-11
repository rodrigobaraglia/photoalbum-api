import { Request, Response } from "express";
import { createDocument, getDocuments } from "../../services";

function respond<F extends Function>(res: Response, callback: F): Response {
  return res.json(callback);
}

export function requestHandler<F extends Function,
  G extends Function,
  H extends Function>(procedure: F) {
  return (model: G, message: H) => async (
    req: Request,
    res: Response
  ): Promise<Response> => respond(res, message({ data: await procedure(model, req) }));
}

export const postHandler = requestHandler(createDocument);
export const getHandler = requestHandler(getDocuments);
