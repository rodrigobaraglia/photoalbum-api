import { Request, Response } from "express";
import {TEST_STRING} from "../assets/strings";

export function handleTestRoute(req: Request, res: Response): Response {
    return res.send(TEST_STRING)
}