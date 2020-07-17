import { Request } from "express";
import {
  validateDocument,
  IValidationResults,
} from "../validation";
import { IStruct } from "../utils";


export function documentFactory<T, S>(
    extractor: ((req: Request) => T),
    constructor: ((x:T)=>S),
    propsCheck: (item: S) => IValidationResults<S>
  ) {
    return function _documentFactory(data: Request):IStruct<S> | void {
      return validateDocument(propsCheck(constructor(extractor(data))));
    };
  }
  