import { respond } from "../../services/respond";
import { I_RequestHandler } from "./declarations";

export function handleRequest <F extends Function>(procedure: F): I_RequestHandler {
  return function _handleRequest(model, message) {
    return async function __handleRequest(req, res) {
      return respond(res, message({ data: await procedure(model, req) }));
    };
  };
}
