import { respond } from "./response.handler";
import { IResponseHandler } from "./declarations";


//Functions are named to keep track of them in error messages. Underscore is used to denote inner functions. 
export function handleRequest<F extends Function>(procedure: F): IResponseHandler {
  return function _handleRequest(model, message) {
    return async function __handleRequest(req, res) {
      //shouldn't the response be async _handleRequest could be wrapped in asyncHandler
      return respond(res, message({ data: await procedure(model, req) }));
    };
  };
}
