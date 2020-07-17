import { Schema, model } from "mongoose";
import { IPhoto, IAlbum, IComment, IUser } from "./declarations";
import { Request } from "express";
import { validateProps, Validated } from "../validation";
import { parseForm } from "../services";
import { ForeignData as Data } from "../utils";
import { documentFactory } from "./documentFactory";
import {IStruct} from "../utils";

export const photoSchema = new Schema({
  title: String,
  description: String,
  path: String,
});

export const Model = model<IPhoto>("Photo", photoSchema);

const propKeys = {
  pathAlias: "path",
  other: ["title", "description"],
};

const photoPropsCheck: <T>(item: T) => Validated<T> = validateProps(
  propKeys.pathAlias,
  ...propKeys.other
);

const extractPhotoData: (req: Request) => Data = parseForm(
  propKeys.pathAlias,
  ...propKeys.other
);

function createPhoto(data: Data) {
  return new Model(data);
}

type Factory<T> = (data: Request) => void | IStruct<T>

export const factory = documentFactory(
  extractPhotoData,
  createPhoto,
  photoPropsCheck
);




//Further abstraction incorporating class:
type Entity = IPhoto | IUser | IAlbum | IComment | unknown
class DocumentModel {
  
  schema: Schema
  _Model: any
  propKeys: any
  propsCheck: <T>(item: T) => Validated<T>
  extractData: (req:Request) => Data
  createDocument: <T>(data: Data) => T
  factory: (data: Request) => void | IStruct<Entity>
  
  constructor(schema:any, pathAlias:any, ...otherKeys: string[]) {
    this.schema = new Schema(schema)
    this.propKeys = {pathAlias, other: otherKeys}
    this._Model= model<IPhoto>("Photo", photoSchema);
    this.propsCheck = validateProps(
      this.propKeys.pathAlias,
      ...this.propKeys.other
    );
    this.extractData = parseForm(
      this.propKeys.pathAlias,
      ...this.propKeys.other
    );
    this.createDocument = function (data: Data) {
      return new this._Model(data);
    }
    this.factory = documentFactory(
      this.extractData,
      this.createDocument,
      this.propsCheck
    );  
  }
}


const Photo = new DocumentModel({
  title: String,
  description: String,
  path: String,
}, "path", "title", "description")

Photo.factory