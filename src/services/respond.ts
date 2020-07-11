import { Response } from "express";

export function respond<F extends Function>(res: Response, callback: F): Response {
  return res.json(callback);
}
