import { Request, Response } from "express";
import { Document, Model, Query } from "mongoose";
import { isDefined, handleAsync } from "../validation";

async function _save(document: Document): Promise<void> {
  await document.save();
}

const save: (document: Document) => Promise<void> = handleAsync(_save);

async function _getDocuments<D extends Document>(
  document: Model<D, Query<D>>,
  req: Request
): Promise<D> {
  return isDefined<string>(req.params.id)
    ? await document.findById(req.params.id)
    : await document.find();
}

function _insertDocument<F extends Function, G extends Document>(
  factory: F,
  req: Request
): G | void {
  const doc: G = factory(req);
  if (isDefined(doc)) {
    save(doc);
    return doc;
  } else {
    console.log("Document is undefined");
  }
}

export const getDocuments = handleAsync(_getDocuments);
export const insertDocument = handleAsync(_insertDocument);
