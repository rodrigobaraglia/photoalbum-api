import { Request, Response } from "express";
import { Model, Document } from "mongoose";
import { Factory } from "../../models/declarations";

interface I__RequestHandler {
  (req: Request, res: Response): Promise<Response>;
}

export interface I_RequestHandler {
  <T extends Function, S extends Function>(model: T, message: S): I__RequestHandler;
}
export type RequestHandler = I_RequestHandler | I__RequestHandler;
