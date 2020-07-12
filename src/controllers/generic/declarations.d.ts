import { Request, Response } from "express";
import { Model, Document } from "mongoose";
import { Factory } from "../../models/declarations";

interface IRequestHandler {
  (req: Request, res: Response): Promise<Response>
  
}

export interface IResponseHandler {
  <T extends Function, S extends Function>(model: T, message: S): IRequestHandler;
}

