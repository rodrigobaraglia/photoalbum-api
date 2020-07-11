import { Request, Response } from "express";
import { Document, Model, Query } from "mongoose";
import { isDefined, handleAsync } from "../utils";

async function _save(document: Document): Promise<void> {
  await document.save();
}

async function _get<D extends Document>(
  document: Model<D, Query<D>>,
  req: Request
): Promise<D> {
  return isDefined<string>(req.params.id)
    ? await document.findById(req.params.id)
    : await document.find();
}

const get = handleAsync(_get);

const save = handleAsync(_save);

function createDocument<F extends Function, G extends Document>(
  factory: F,
  req: Request
): G {
  const doc: G = factory(req);
  save(doc);
  return doc;
}

function respond<F extends Function>(res: Response, callback: F): Response {
  return res.json(callback);
}

const responseHandler = <
  F extends Function,
  G extends Function,
  H extends Function
>(
  procedure: F
) => (model: G, message: H) => async (
  req: Request,
  res: Response
): Promise<Response> =>
  respond(res, message({ data: await procedure(model, req) }));

export const postHandler = responseHandler(createDocument);
export const getHandler = responseHandler(get);

// export async function get(document: any, req: Request) {
//   try {
//     return isDefined<string>(req.params.id)
//       ? await document.findById(req.params.id)
//       : await document.find();
//   } catch (err) {
//     const error = { message: "An error ocurred. Document not found", log: err };
//     console.log(error);
//     return { error: error.message };
//   }
// }
// export function postHandler(factory: any, message: any) {
//   return async (req: Request, res: Response) =>
//     respond(res, message({ data: await createDocument(factory, req) }));
// }

// export const getHandler = (model: any, message: any) => async (req: Request, res: Response) =>
//  respond(res, message({data: await get(model)}));
