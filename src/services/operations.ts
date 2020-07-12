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

const save = handleAsync(_save);

export const getDocuments = handleAsync(_get);

export function createDocument<F extends Function, G extends Document>(
  factory: F,
  req: Request
): G {
  const doc: G = factory(req);
  save(doc);
  return doc;
}
