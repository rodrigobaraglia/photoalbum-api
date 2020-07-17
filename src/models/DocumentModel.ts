import { Schema, model, Model, Document } from "mongoose";
import { IPhoto, IAlbum, IComment, IUser } from "./declarations";
import { Request } from "express";
import { validateProps, Validated } from "../validation";
import { parseForm } from "../services";
import { ForeignData as Data } from "../utils";
import { documentFactory } from "./documentFactory";
import { IStruct } from "../utils";

//Further abstraction incorporating class:
type DefinedEntity = IPhoto | IUser | IAlbum | IComment;
type Entity = DefinedEntity | unknown;

class DocumentModel {
  schema: Schema;
  Model: Model<any>;
  propKeys: {pathAlias: string, other: string []};
  propsCheck: <T>(item: T) => Validated<T>;
  extractData: (req: Request) => Data;
  createDocument: <T>(data: Data) => T;
  factory: (data: Request) => void | IStruct<Entity>;

  constructor(
    name: string,
    schema: { [key: string]: Object },
    pathAlias: string,
    ...otherKeys: string[]
  ) {
    this.schema = new Schema(schema);
    this.propKeys = { pathAlias, other: otherKeys };
    this.Model = model<DefinedEntity>(name, this.schema);
    this.propsCheck = validateProps(
      this.propKeys.pathAlias,
      ...this.propKeys.other
    );
    this.extractData = parseForm(
      this.propKeys.pathAlias,
      ...this.propKeys.other
    );
    this.createDocument = function (data: Data) {
      return new this.Model(data);
    };
    this.factory = documentFactory(
      this.extractData,
      this.createDocument,
      this.propsCheck
    );
  }
}

const Photo = new DocumentModel(
  "Photo",
  {
    title: String,
    description: String,
    path: String,
  },
  "path",
  "title",
  "description"
);

Photo.factory;
