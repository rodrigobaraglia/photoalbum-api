import { Request } from "express";
import { IStruct, pluckProps } from "../utils";
import { validateProps } from "../validation";
import { bodyPropsError } from "../errors";

export function parseBody(...props: string[]) {
  return function _parseBody<T>(req: Request): IStruct<T> | void {
    return validateProps(...props)(req.body).isValid
      ? pluckProps(props, req.body)
      : bodyPropsError(props, req.body);
  };
}

export function getFilePath(req: Request) {
  return { path: req.file.path };
}

export function parseForm(fileProp: string, ...props: string[]) {
  return function _parseForm(req: Request) {
    const body = parseBody(...props);
    const file = getFilePath(req);
    
    return validateProps("file")(req)
      ? { ...body(req), [fileProp]: file.path }
      : bodyPropsError(["file"], req);
  };
}
