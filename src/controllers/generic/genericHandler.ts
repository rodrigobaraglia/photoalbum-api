import { respond } from "../../services/respond";
import { IResponseHandler } from "./declarations";

export function handleService<F extends Function>(procedure: F): IResponseHandler {
  return function _handleResponse(model, message) {
    return async function _handleRequest(req, res) {
      return respond(res, message({ data: await procedure(model, req) }));
    };
  };
}
